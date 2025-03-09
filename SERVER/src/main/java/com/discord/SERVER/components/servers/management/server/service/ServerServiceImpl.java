package com.discord.SERVER.components.servers.management.server.service;

import com.discord.SERVER.components.individual.repository.IndividualRepository;
import com.discord.SERVER.components.servers.management.server.dto.ServerRequestDTO;
import com.discord.SERVER.components.servers.management.server.dto.ServerResponseDTO;
import com.discord.SERVER.components.servers.management.server.mapper.ServerMapper;
import com.discord.SERVER.components.servers.management.server.repository.ServerRepository;
import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.entities.Server;
import com.discord.SERVER.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

        return serverMapper.toResponse(serverRepository.save(server));
    }

    @Override
    public void deleteServer(Long serverId) {
        Server server = serverRepository.findById(serverId)
                        .orElseThrow(() -> new ResourceNotFoundException("server doesn't not exist with id: "+serverId));
                serverRepository.delete(server);
    }
}
