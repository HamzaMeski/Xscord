package com.discord.SERVER.components.servers.management.serverJoinDemand.service;

import com.discord.SERVER.components.individual.dto.IndividualResponseDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandRequestDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandResponseDTO;
import java.util.List;

public interface ServerJoinDemandService {
    ServerJoinDemandResponseDTO sendRequest(ServerJoinDemandRequestDTO request);
    ServerJoinDemandResponseDTO acceptRequest(ServerJoinDemandRequestDTO request);
    List<ServerJoinDemandResponseDTO> getIndividualInvitations(Long receiverId);
    List<IndividualResponseDTO> getServerMembers(Long serverId);
    void refuseRequest(Long requestId);
}
