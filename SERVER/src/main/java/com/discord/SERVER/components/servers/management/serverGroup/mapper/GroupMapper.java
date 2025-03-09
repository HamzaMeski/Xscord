package com.discord.SERVER.components.servers.management.serverGroup.mapper;

import com.discord.SERVER.components.servers.management.serverGroup.dto.GroupRequestDTO;
import com.discord.SERVER.components.servers.management.serverGroup.dto.GroupResponseDTO;
import com.discord.SERVER.entities.Group;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GroupMapper {
    Group toEntity(GroupRequestDTO requestDTO);

    GroupResponseDTO toResponse(Group group);
}
