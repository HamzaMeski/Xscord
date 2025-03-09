package com.discord.SERVER.components.servers.management.serverGroup.dto;


import java.time.LocalDateTime;

public record GroupResponseDTO(
        Long id,
        Long serverId,
        String name,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
){}
