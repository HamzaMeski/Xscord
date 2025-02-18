package com.discord.SERVER.components.individual.dto;

import java.time.LocalDateTime;

public record IndividualResponseDTO(
        Long id,
        String email,
        String password,
        String firstName,
        String secondName,
        String displayName,
        String phone,
        String bio,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
