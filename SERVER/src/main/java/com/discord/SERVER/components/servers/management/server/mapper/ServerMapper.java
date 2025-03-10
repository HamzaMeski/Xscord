package com.discord.SERVER.components.servers.management.server.mapper;

import com.discord.SERVER.components.individual.mapper.IndividualMapper;
import com.discord.SERVER.components.servers.management.server.dto.ServerRequestDTO;
import com.discord.SERVER.components.servers.management.server.dto.ServerResponseDTO;
import com.discord.SERVER.components.servers.management.serverGroup.mapper.GroupMapper;
import com.discord.SERVER.entities.Server;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {GroupMapper.class, IndividualMapper.class})
public interface ServerMapper {
    Server toEntity(ServerRequestDTO requestDTO);

    @Mapping(target = "individualId", source = "individual.id")
    ServerResponseDTO toResponse(Server server);
}
