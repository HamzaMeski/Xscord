package com.discord.SERVER.components.auth.mapper;

import com.discord.SERVER.components.auth.dto.UserResponseDTO;
import com.discord.SERVER.entities.Admin;
import com.discord.SERVER.entities.Individual;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    @Mapping(target = "role", constant = "ROLE_ADMIN")
    UserResponseDTO toResponse(Admin admin);

    @Mapping(target = "role", constant = "ROLE_INDIVIDUAL")
    UserResponseDTO toResponse(Individual individual);
}
