package com.discord.SERVER.components.servers.management.serverJoinDemand.service;

import com.discord.SERVER.components.individual.dto.IndividualResponseDTO;
import com.discord.SERVER.components.individual.mapper.IndividualMapper;
import com.discord.SERVER.components.individual.repository.IndividualRepository;
import com.discord.SERVER.components.servers.management.server.dto.ServerResponseDTO;
import com.discord.SERVER.components.servers.management.server.mapper.ServerMapper;
import com.discord.SERVER.components.servers.management.server.repository.ServerRepository;
import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandRequestDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandResponseDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.mapper.ServerJoinDemandMapper;
import com.discord.SERVER.components.servers.management.serverJoinDemand.repository.ServerJoinDemandRepository;
import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.entities.Server;
import com.discord.SERVER.entities.ServerJoinDemand;
import com.discord.SERVER.exception.DuplicateResourceException;
import com.discord.SERVER.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ServerJoinDemandServiceImpl implements ServerJoinDemandService {
    private final ServerJoinDemandRepository serverJoinDemandRepository;
    private final ServerJoinDemandMapper serverJoinDemandMapper;
    private final ServerRepository serverRepository;
    private final IndividualRepository individualRepository;
    private final IndividualMapper individualMapper;
    private final ServerMapper serverMapper;

    @Override
    public ServerJoinDemandResponseDTO sendRequest(ServerJoinDemandRequestDTO request) {
        Server server = serverRepository.findById(request.serverId())
                .orElseThrow(() -> new ResourceNotFoundException("server doesn't not exist with id: "+request.serverId()));

        Individual receiver = individualRepository.findById(request.receiverId())
                .orElseThrow(() -> new ResourceNotFoundException("receiver doesn't not exist with id: "+request.receiverId()));

        if(serverJoinDemandRepository.existsWithTrueAcceptation(server, receiver)){
            throw new DuplicateResourceException("the receiver already is a member of that server");
        }

        if(serverJoinDemandRepository.existsWithFalseAcceptation(server, receiver)){
            ServerJoinDemand serverJoinDemand = serverJoinDemandRepository.findByServerAndReceiver(server, receiver);
            serverJoinDemand.setUpdatedAt(LocalDateTime.now());
            return serverJoinDemandMapper.toResponse(serverJoinDemandRepository.save(serverJoinDemand));
        }

        ServerJoinDemand serverJoinDemand = serverJoinDemandMapper.toEntity(request);
        serverJoinDemand.setServer(server);
        serverJoinDemand.setReceiver(receiver);

        return serverJoinDemandMapper.toResponse(serverJoinDemandRepository.save(serverJoinDemand));
    }

    @Override
    public ServerJoinDemandResponseDTO acceptRequest(ServerJoinDemandRequestDTO request) {
        Server server = serverRepository.findById(request.serverId())
                .orElseThrow(() -> new ResourceNotFoundException("server doesn't not exist with id: "+request.serverId()));
        Individual receiver = individualRepository.findById(request.receiverId())
                .orElseThrow(() -> new ResourceNotFoundException("receiver doesn't not exist with id: "+request.receiverId()));


        ServerJoinDemand serverJoinDemand = serverJoinDemandRepository.findByServerAndReceiver(server, receiver);

        serverJoinDemand.setAccepted(true);

        return serverJoinDemandMapper.toResponse(serverJoinDemandRepository.save(serverJoinDemand));
    }

    @Override
    public List<ServerJoinDemandResponseDTO> getIndividualInvitations(Long receiverId) {
        Individual receiver = individualRepository.findById(receiverId)
                .orElseThrow(() -> new ResourceNotFoundException("receiver doesn't not exist with id: "+receiverId));

        return serverJoinDemandRepository.individualInvitationsWithFalseAcceptation(receiver).stream()
                .map(serverJoinDemandMapper::toResponse)
                .toList();
    }

    @Override
    public List<IndividualResponseDTO> getServerMembers(Long serverId) {
        Server server = serverRepository.findById(serverId)
                .orElseThrow(() -> new ResourceNotFoundException("server doesn't found with id "+serverId));


        return serverJoinDemandRepository.getServerMembers(server).stream()
                .map(individualMapper::toResponse)
                .toList();
    }

    @Override
    public List<ServerResponseDTO> getMemberJoinedServers(Long memberId) {
        Individual member = individualRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("member doesn't not exist with id: "+memberId));

        return serverJoinDemandRepository.getMemberJoinedServers(member).stream()
                .map(serverMapper::toResponse)
                .toList();
    }

    @Override
    public void refuseRequest(Long requestId) {
        ServerJoinDemand serverJoinDemand = serverJoinDemandRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("request doesn't exist with id: "+requestId));

        serverJoinDemandRepository.delete(serverJoinDemand);
    }
}
