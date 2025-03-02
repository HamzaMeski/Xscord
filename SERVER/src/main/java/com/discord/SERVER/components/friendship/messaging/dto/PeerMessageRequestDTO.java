package com.discord.SERVER.components.friendship.messaging.dto;

import jakarta.validation.constraints.NotNull;

public record PeerMessageRequestDTO(
        @NotNull(message = "receiver id is required")
        Long receiverId,

        String content
) {}