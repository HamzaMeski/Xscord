package com.discord.SERVER.components.friendship.relationship.friendsList.dto;

import com.discord.SERVER.entities.Individual;

import java.time.LocalDateTime;

public record FriendsListResponseDTO(
        Long id,
        Individual individual1,
        Individual individual2,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
