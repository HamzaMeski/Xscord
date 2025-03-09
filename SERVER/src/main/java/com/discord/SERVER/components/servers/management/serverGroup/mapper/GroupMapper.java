package com.discord.SERVER.components.servers.management.serverGroup.mapper;

import com.discord.SERVER.components.servers.management.serverGroup.dto.GroupRequestDTO;
import com.discord.SERVER.components.servers.management.serverGroup.dto.GroupResponseDTO;
import com.discord.SERVER.entities.Group;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GroupMapper {
    Group toEntity(GroupRequestDTO requestDTO);

    @Mapping(target = "serverId", source = "server.id")
    GroupResponseDTO toResponse(Group group);
}
