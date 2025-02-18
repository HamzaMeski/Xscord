package com.discord.SERVER.components.individual.service;

import com.discord.SERVER.components.individual.dto.IndividualRequestDTO;
import com.discord.SERVER.components.individual.dto.IndividualResponseDTO;
import com.discord.SERVER.components.individual.mapper.IndividualMapper;
import com.discord.SERVER.components.individual.repository.IndividualRepository;
import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.exception.DuplicateResourceException;
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
            throw new DuplicateResourceException("Email already exists");
        }

        Individual individual = individualMapper.toEntity(requestDTO);
        individual.setPassword(passwordEncoder.encode(requestDTO.password()));

        return individualMapper.toResponse(individualRepository.save(individual));
    }

    @Override
    public IndividualResponseDTO getProfile(Long id) {
        return null;
    }

    @Override
    public IndividualResponseDTO updateProfile(Long id, IndividualRequestDTO requestDTO) {
        return null;
    }

    @Override
    public void deleteProfile(Long id) {

    }
}
