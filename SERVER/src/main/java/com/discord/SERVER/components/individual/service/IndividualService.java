package com.discord.SERVER.components.individual.service;

import com.discord.SERVER.components.individual.dto.IndividualRequestDTO;
import com.discord.SERVER.components.individual.dto.IndividualResponseDTO;

public interface IndividualService {
    IndividualResponseDTO register(IndividualRequestDTO requestDTO);
    IndividualResponseDTO getIndividual(Long id);
    IndividualResponseDTO updateProfile(Long id, IndividualRequestDTO requestDTO);
    void deleteProfile(Long id);
}
