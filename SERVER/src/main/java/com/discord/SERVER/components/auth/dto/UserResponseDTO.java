package com.discord.SERVER.components.auth.dto;

import java.time.LocalDateTime;

public record UserResponseDTO(
        Long id,
        String email,
        String password,
        String firstName,
        String lastName,
        String displayName,
        String phone,
        String bio,
        String role,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
