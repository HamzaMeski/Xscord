package com.discord.SERVER.components.friendship.relationship.blockedIndividual.service;

import com.discord.SERVER.components.friendship.relationship.blockedIndividual.dto.BlockedIndividualResponseDTO;
import com.discord.SERVER.components.friendship.relationship.blockedIndividual.mapper.BlockedIndividualMapper;
import com.discord.SERVER.components.friendship.relationship.blockedIndividual.repository.BlockedIndividualRepository;
import com.discord.SERVER.components.individual.mapper.IndividualMapper;
import com.discord.SERVER.components.individual.repository.IndividualRepository;
import com.discord.SERVER.entities.BlockedIndividual;
import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlockedIndividualServiceImpl implements BlockedIndividualService {

    private final BlockedIndividualRepository blockedIndividualRepository;
    private final IndividualRepository individualRepository;
    private final BlockedIndividualMapper blockedIndividualMapper;

    @Override
    public BlockedIndividualResponseDTO blockIndividual(Long blockerId, Long individualId) {
        Individual blocker = individualRepository.findById(blockerId)
                .orElseThrow(() -> new ResourceNotFoundException("blocker with that id doesn't exist."));

        Individual individual = individualRepository.findById(individualId)
                .orElseThrow(() -> new ResourceNotFoundException("individual with that id doesn't exist."));


        return blockedIndividualMapper.toResponse(blockedIndividualRepository.save(
                BlockedIndividual.builder()
                        .blocker(blocker)
                        .blockedIndividual(individual)
                        .build()
        ));
    }

    @Override
    public void unBlockIndividual(Long blockId) {
        BlockedIndividual block = blockedIndividualRepository.findById(blockId)
                .orElseThrow(() -> new ResourceNotFoundException("block with that id doesn't exist."));

        blockedIndividualRepository.delete(block);
    }

    @Override
    public List<BlockedIndividualResponseDTO> getBlockedPersonsOfIndividual(Long individualId) {
        Individual individual = individualRepository.findById(individualId)
                .orElseThrow(() -> new ResourceNotFoundException("individual with that id doesn't exist."));

        return blockedIndividualRepository.getBlockedPersonsOfIndividual(individual).stream()
                .map(blockedIndividualMapper::toResponse)
                .toList();
    }
}
