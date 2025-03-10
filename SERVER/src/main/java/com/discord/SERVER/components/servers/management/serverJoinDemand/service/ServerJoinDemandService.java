package com.discord.SERVER.components.servers.management.serverJoinDemand.service;

import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandRequestDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandResponseDTO;

public interface ServerJoinDemandService {
    ServerJoinDemandResponseDTO sendRequest(ServerJoinDemandRequestDTO request);
    ServerJoinDemandResponseDTO acceptRequest(Long requestId);
    void refuseRequest(Long requestId);
}
