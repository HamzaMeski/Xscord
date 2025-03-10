package com.discord.SERVER.components.servers.management.serverJoinDemand.service;

import com.discord.SERVER.components.individual.repository.IndividualRepository;
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
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServerJoinDemandServiceImpl implements ServerJoinDemandService {
    private final ServerJoinDemandRepository serverJoinDemandRepository;
    private final ServerJoinDemandMapper serverJoinDemandMapper;
    private final ServerRepository serverRepository;
    private final IndividualRepository individualRepository;

    @Override
    public ServerJoinDemandResponseDTO sendRequest(ServerJoinDemandRequestDTO request) {
        Server server = serverRepository.findById(request.serverId())
                .orElseThrow(() -> new ResourceNotFoundException("server doesn't not exist with id: "+request.serverId()));

//        if(serverRepository.doesIndividualHaveServer())

        Individual receiver = individualRepository.findById(request.receiverId())
                .orElseThrow(() -> new ResourceNotFoundException("receiver doesn't not exist with id: "+request.receiverId()));

        if(serverJoinDemandRepository.existsWithTrueAcceptation(server, receiver)){
            throw new DuplicateResourceException("the receiver already is a member of that server");
        }

        if(serverJoinDemandRepository.existsWithFalseAcceptation(server, receiver)){
            ServerJoinDemand serverJoinDemand = serverJoinDemandRepository.findByServerAndReceiver(server, receiver);
            return serverJoinDemandMapper.toResponse(serverJoinDemandRepository.save(serverJoinDemand));
        }

        ServerJoinDemand serverJoinDemand = serverJoinDemandMapper.toEntity(request);
        serverJoinDemand.setServer(server);
        serverJoinDemand.setReceiver(receiver);

        return serverJoinDemandMapper.toResponse(serverJoinDemandRepository.save(serverJoinDemand));
    }

    @Override
    public ServerJoinDemandResponseDTO acceptRequest(Long requestId) {
        ServerJoinDemand serverJoinDemand = serverJoinDemandRepository.findById(requestId)
                .orElseThrow();

        serverJoinDemand.setAccepted(true);

        return serverJoinDemandMapper.toResponse(serverJoinDemandRepository.save(serverJoinDemand));
    }

    @Override
    public void refuseRequest(Long requestId) {
        ServerJoinDemand serverJoinDemand = serverJoinDemandRepository.findById(requestId)
                .orElseThrow();
        serverJoinDemandRepository.delete(serverJoinDemand);
    }
}
