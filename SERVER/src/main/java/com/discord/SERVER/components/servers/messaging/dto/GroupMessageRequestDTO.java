package com.discord.SERVER.components.servers.messaging.dto;

import jakarta.validation.constraints.NotNull;

public record GroupMessageRequestDTO(
        @NotNull(message = "group id is required")
        Long groupId,

        String content
) {}