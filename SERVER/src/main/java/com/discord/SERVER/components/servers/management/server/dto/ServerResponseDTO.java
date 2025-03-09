package com.discord.SERVER.components.servers.management.server.dto;

import com.discord.SERVER.entities.Group;
import com.discord.SERVER.entities.Individual;

import java.time.LocalDateTime;
import java.util.List;

public record ServerResponseDTO (
        Long id,
        Individual individual,
        List<Group> groups,
        String name,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
){}
