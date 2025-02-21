package com.discord.SERVER.components.friendship.relationship.blockedIndividual.mapper;

import com.discord.SERVER.components.friendship.relationship.blockedIndividual.dto.BlockedIndividualResponseDTO;
import com.discord.SERVER.entities.BlockedIndividual;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BlockedIndividualMapper {
    BlockedIndividualResponseDTO toResponse(BlockedIndividual blockedIndividual);
}
