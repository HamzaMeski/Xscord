package com.discord.SERVER.components.servers.management.serverJoinDemand.dto;

import java.time.LocalDateTime;

public record ServerJoinDemandResponseDTO (
        Long id,
        Long serverId,
        String serverName,
        Long receiverId,
        boolean accepted,
        String invitationLink,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
){}