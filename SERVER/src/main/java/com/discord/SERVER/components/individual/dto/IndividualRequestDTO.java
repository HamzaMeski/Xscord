package com.discord.SERVER.components.individual.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record IndividualRequestDTO(
    @Email(message = "plz provide a valid email")
    @NotBlank(message = "email is required")
    String email,

    @NotBlank(message = "password is required")
    String password,

    @NotBlank(message = "first name is required")
    String firstName,

    @NotBlank(message = "second name is required")
    String secondName,

    @NotBlank(message = "display name is required")
    String displayName,

    @NotBlank(message = "phone number is required")
    String phone,

    String bio
) {}
