package com.discord.SERVER.components.friendship.relationship.friendShipDemand.dto;

import com.discord.SERVER.entities.Individual;

import java.time.LocalDateTime;

public record FriendShipDemandResponseDTO(
        Long id,
        Individual requester,
        Individual receiver,
        Boolean accepted,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}