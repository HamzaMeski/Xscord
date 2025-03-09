package com.discord.SERVER.components.servers.management.server.dto;

import jakarta.validation.constraints.NotBlank;

public record ServerRequestDTO (
        @NotBlank(message = "group name is required")
        String name,

        String description
){}