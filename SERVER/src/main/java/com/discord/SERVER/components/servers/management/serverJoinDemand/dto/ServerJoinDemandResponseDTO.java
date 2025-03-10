package com.discord.SERVER.components.servers.management.serverJoinDemand.dto;

import java.time.LocalDateTime;

public record ServerJoinDemandResponseDTO (
        Long id,
        Long serverId,
        Long receiverId,
        boolean isLinkInvitation,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
){}