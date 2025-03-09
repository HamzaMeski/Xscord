package com.discord.SERVER.components.servers.management.server.service;


import com.discord.SERVER.components.servers.management.server.dto.ServerRequestDTO;
import com.discord.SERVER.components.servers.management.server.dto.ServerResponseDTO;
import com.discord.SERVER.entities.Individual;

public interface ServerService {
    ServerResponseDTO createServer(ServerRequestDTO requestDTO, Long serverOwnerId);

    void deleteServer(Long serverId);
}
