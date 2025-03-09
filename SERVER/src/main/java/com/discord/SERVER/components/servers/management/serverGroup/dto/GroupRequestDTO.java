package com.discord.SERVER.components.servers.management.serverGroup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record GroupRequestDTO(
        @NotNull(message = "server id is required")
        Long serverId,

        @NotBlank(message = "group name is required")
        String name,

        String description
){}
