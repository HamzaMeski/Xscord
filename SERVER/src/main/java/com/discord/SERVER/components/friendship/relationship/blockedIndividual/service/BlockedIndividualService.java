package com.discord.SERVER.components.friendship.relationship.blockedIndividual.service;

import com.discord.SERVER.components.friendship.relationship.blockedIndividual.dto.BlockedIndividualResponseDTO;

import java.util.List;

public interface BlockedIndividualService {
    BlockedIndividualResponseDTO blockIndividual(Long blockerId, Long individualId);
    void unBlockIndividual(Long blockId);
    List<BlockedIndividualResponseDTO> getBlockedPersonsOfIndividual(Long individualId);
}
