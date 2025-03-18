package com.discord.SERVER.components.servers.messaging.mapper;

import com.discord.SERVER.components.servers.messaging.dto.GroupMessageResponseDTO;
import com.discord.SERVER.entities.GroupMessage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GroupMessageMapper {
    GroupMessageResponseDTO toResponse(GroupMessage groupMessage);
}

