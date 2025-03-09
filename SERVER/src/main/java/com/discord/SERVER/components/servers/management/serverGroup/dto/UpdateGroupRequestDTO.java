package com.discord.SERVER.components.servers.management.serverGroup.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateGroupRequestDTO (
        @NotBlank(message = "group name is required")
        String name,

        String description
){}
