package com.discord.SERVER.components.individual.service;

import com.discord.SERVER.components.individual.dto.IndividualRequestDTO;
import com.discord.SERVER.components.individual.dto.IndividualResponseDTO;
import com.discord.SERVER.components.individual.mapper.IndividualMapper;
import com.discord.SERVER.components.individual.repository.IndividualRepository;
import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.exception.DuplicateResourceException;
import com.discord.SERVER.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class IndividualServiceImpl implements IndividualService {

    private final IndividualRepository individualRepository;
    private final IndividualMapper individualMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public IndividualResponseDTO register(IndividualRequestDTO requestDTO) {
        if(individualRepository.existsByEmail(requestDTO.email())) {
            throw new DuplicateResourceException("Email already exists. ");
        }

        Individual individual = individualMapper.toEntity(requestDTO);
        individual.setPassword(passwordEncoder.encode(requestDTO.password()));

        return individualMapper.toResponse(individualRepository.save(individual));
    }

    @Override
    public IndividualResponseDTO getIndividual(Long id) {
        Individual individual = findIndividualById(id);
        return individualMapper.toResponse(individual);
    }

    @Override
    public IndividualResponseDTO updateProfile(Long id, IndividualRequestDTO requestDTO) {
        Individual individual = findIndividualById(id);

        if(individualRepository.checkEmailForUpdate(requestDTO.email(), id)) {
            throw new DuplicateResourceException("email already exist");
        }

        individualMapper.updateEntity(requestDTO, individual);
        return individualMapper.toResponse(individualRepository.save(individual));
    }

    @Override
    public void deleteProfile(Long id) {
        findIndividualById(id);
        individualRepository.deleteById(id);
    }

    Individual findIndividualById(Long id) {
        return individualRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("individual not found with that id."));
    }
}
