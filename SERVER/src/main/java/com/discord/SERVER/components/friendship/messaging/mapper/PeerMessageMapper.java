package com.discord.SERVER.components.friendship.messaging.mapper;

import com.discord.SERVER.components.friendship.messaging.dto.PeerMessageResponseDTO;
import com.discord.SERVER.entities.PeerMessage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PeerMessageMapper {

    PeerMessageResponseDTO toResponse(PeerMessage peerMessage);
}
