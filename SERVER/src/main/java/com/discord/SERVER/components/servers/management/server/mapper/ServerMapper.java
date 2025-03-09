package com.discord.SERVER.components.servers.management.server.mapper;

import com.discord.SERVER.components.servers.management.server.dto.ServerRequestDTO;
import com.discord.SERVER.components.servers.management.server.dto.ServerResponseDTO;
import com.discord.SERVER.entities.Server;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServerMapper {
    Server toEntity(ServerRequestDTO requestDTO);

    ServerResponseDTO toResponse(Server server);
}
