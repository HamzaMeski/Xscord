package com.discord.SERVER.components.servers.management.serverGroup.mapper;

import com.discord.SERVER.components.servers.management.serverGroup.dto.CreateGroupRequestDTO;
import com.discord.SERVER.components.servers.management.serverGroup.dto.GroupResponseDTO;
import com.discord.SERVER.entities.Group;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GroupMapper {
    Group toEntity(CreateGroupRequestDTO requestDTO);

    @Mapping(target = "serverId", source = "server.id")
    GroupResponseDTO toResponse(Group group);
}
