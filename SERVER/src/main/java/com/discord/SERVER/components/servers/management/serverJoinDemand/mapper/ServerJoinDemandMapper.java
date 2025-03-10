package com.discord.SERVER.components.servers.management.serverJoinDemand.mapper;

import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandRequestDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandResponseDTO;
import com.discord.SERVER.entities.ServerJoinDemand;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ServerJoinDemandMapper {
    ServerJoinDemand toEntity(ServerJoinDemandRequestDTO joinDemandRequest);

    @Mapping(target = "serverId", source = "server.id")
    @Mapping(target = "receiverId", source = "receiver.id")
    ServerJoinDemandResponseDTO toResponse(ServerJoinDemand serverJoinDemand);
}
