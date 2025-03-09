package com.discord.SERVER.components.servers.management.server.service;

import com.discord.SERVER.components.individual.repository.IndividualRepository;
import com.discord.SERVER.components.servers.management.server.dto.ServerRequestDTO;
import com.discord.SERVER.components.servers.management.server.dto.ServerResponseDTO;
import com.discord.SERVER.components.servers.management.server.mapper.ServerMapper;
import com.discord.SERVER.components.servers.management.server.repository.ServerRepository;
import com.discord.SERVER.entities.Group;
import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.entities.Server;
import com.discord.SERVER.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServerServiceImpl implements ServerService{
    private final ServerRepository serverRepository;
    private final ServerMapper serverMapper;
    private final IndividualRepository individualRepository;

    @Override
    public ServerResponseDTO createServer(ServerRequestDTO requestDTO, Long serverOwnerId) {
        Individual serverOwner = individualRepository.findById(serverOwnerId)
                .orElseThrow();
        Server server = serverMapper.toEntity(requestDTO);
        server.setIndividual(serverOwner);

        // first default group #general
        Group group1 = Group.builder()
                .server(server)
                .name("general")
                .description("general group")
                .build();
        server.getGroups().add(group1);

        // second default group #games
        Group group2 = Group.builder()
                .server(server)
                .name("games")
                .description("games group")
                .build();
        server.getGroups().add(group2);

        // third default group #music
        Group group3 = Group.builder()
                .server(server)
                .name("music")
                .description("music group")
                .build();
        server.getGroups().add(group3);

        return serverMapper.toResponse(serverRepository.save(server));
    }

    @Override
    public List<ServerResponseDTO> getIndividualServers(Long ownerId) {
        Individual serversOwner = individualRepository.findById(ownerId)
                .orElseThrow(() -> new ResourceNotFoundException("there is no owner with id: "+ownerId));

        return serverRepository.findByIndividual(serversOwner).stream()
                .map(serverMapper::toResponse)
                .toList();
    }

    @Override
    public void deleteServer(Long serverId) {
        Server server = serverRepository.findById(serverId)
                        .orElseThrow(() -> new ResourceNotFoundException("server doesn't not exist with id: "+serverId));
                serverRepository.delete(server);
    }
}
