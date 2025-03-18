package com.discord.SERVER.components.friendship.messaging.dto;

import com.discord.SERVER.entities.Individual;

import java.time.LocalDateTime;

public record PeerMessageResponseDTO(
        Long id,
        Individual sender,
        Individual receiver,
        String content,
        boolean isRead,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
