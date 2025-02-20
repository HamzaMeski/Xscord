package com.discord.SERVER.components.friendship.messaging.dto;

import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.entities.MessageResource;

import java.time.LocalDateTime;

public record PeerMessageResponseDTO(
        Long id,
        Individual sender,
        Individual receiver,
        boolean isRead,
        MessageResource messageResource,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
