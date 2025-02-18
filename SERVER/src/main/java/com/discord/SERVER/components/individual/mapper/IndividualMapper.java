package com.discord.SERVER.components.individual.mapper;

import com.discord.SERVER.components.individual.dto.IndividualRequestDTO;
import com.discord.SERVER.components.individual.dto.IndividualResponseDTO;
import com.discord.SERVER.entities.Individual;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface IndividualMapper {

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Individual toEntity(IndividualRequestDTO requestDTO);

    IndividualResponseDTO toResponse(Individual individual);

    void updateEntity(IndividualRequestDTO requestDTO, @MappingTarget Individual individual);
}
