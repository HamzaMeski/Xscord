package com.discord.SERVER.components.servers.messaging.dto;
import com.discord.SERVER.components.individual.dto.IndividualResponseDTO;
import com.discord.SERVER.components.servers.management.serverGroup.dto.GroupResponseDTO;
import java.time.LocalDateTime;

public record GroupMessageResponseDTO(
        Long id,
        IndividualResponseDTO sender,
        GroupResponseDTO group,
        String content,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
