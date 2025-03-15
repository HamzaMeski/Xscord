package com.discord.SERVER.components.servers.management.serverJoinDemand.service;

import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandRequestDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandResponseDTO;

import java.util.List;

public interface ServerJoinDemandService {
    ServerJoinDemandResponseDTO sendRequest(ServerJoinDemandRequestDTO request);
    ServerJoinDemandResponseDTO acceptRequest(Long requestId);
    List<ServerJoinDemandResponseDTO> getIndividualInvitations(Long receiverId);
    void refuseRequest(Long requestId);
}
