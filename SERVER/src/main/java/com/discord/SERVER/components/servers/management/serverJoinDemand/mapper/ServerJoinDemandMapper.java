package com.discord.SERVER.components.servers.management.serverJoinDemand.mapper;

import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandRequestDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandResponseDTO;
import com.discord.SERVER.entities.ServerJoinDemand;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServerJoinDemandMapper {
    ServerJoinDemand toEntity(ServerJoinDemandRequestDTO joinDemandRequest);
    ServerJoinDemandResponseDTO toResponse(ServerJoinDemand serverJoinDemand);
}
