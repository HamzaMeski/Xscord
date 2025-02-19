package com.discord.SERVER.components.friendship.relationship.blockedIndividual.dto;

import com.discord.SERVER.entities.Individual;

import java.time.LocalDateTime;

public record BlockedIndividualResponseDTO(
        Long id,
        Individual blocker,
        Individual blockedIndividual,
        LocalDateTime createdAt
) {}
