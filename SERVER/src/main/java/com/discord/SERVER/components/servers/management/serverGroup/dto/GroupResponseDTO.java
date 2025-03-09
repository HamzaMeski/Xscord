package com.discord.SERVER.components.servers.management.serverGroup.dto;

import com.discord.SERVER.entities.Server;

import java.time.LocalDateTime;

public record GroupResponseDTO(
        Long id,
        Server server,
        String name,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
){}
