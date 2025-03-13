package com.discord.SERVER.components.servers.management.server.service;


import com.discord.SERVER.components.servers.management.server.dto.ServerRequestDTO;
import com.discord.SERVER.components.servers.management.server.dto.ServerResponseDTO;

import java.util.List;

public interface ServerService {
    ServerResponseDTO createServer(ServerRequestDTO requestDTO, Long serverOwnerId);
    List<ServerResponseDTO> getIndividualServers(Long ownerId);
    ServerResponseDTO getServer(Long serverId);
    void deleteServer(Long serverId);
}
