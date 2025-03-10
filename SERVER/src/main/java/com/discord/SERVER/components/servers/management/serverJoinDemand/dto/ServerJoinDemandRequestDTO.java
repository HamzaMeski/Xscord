package com.discord.SERVER.components.servers.management.serverJoinDemand.dto;

import jakarta.validation.constraints.NotNull;

public record ServerJoinDemandRequestDTO(
        @NotNull(message = "server id is required")
        Long serverId,

        @NotNull(message = "receiver id is required")
        Long receiverId,

        boolean isInvitationLink
){}