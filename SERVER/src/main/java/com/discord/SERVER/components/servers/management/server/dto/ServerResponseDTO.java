package com.discord.SERVER.components.servers.management.server.dto;

import java.time.LocalDateTime;

public record ServerResponseDTO (
        Long id,
        Long individualId,
        String name,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
){}
