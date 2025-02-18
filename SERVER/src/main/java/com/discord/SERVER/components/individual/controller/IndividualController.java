package com.discord.SERVER.components.individual.controller;

import com.discord.SERVER.components.individual.dto.IndividualRequestDTO;
import com.discord.SERVER.components.individual.dto.IndividualResponseDTO;
import com.discord.SERVER.components.individual.service.IndividualService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/individuals")
public class IndividualController {

    private final IndividualService individualService;

    @PostMapping("/register")
    public ResponseEntity<IndividualResponseDTO> register(
            @Valid
            @RequestBody
            IndividualRequestDTO requestDTO
    ) {
        return new ResponseEntity<>(individualService.register(requestDTO), HttpStatus.CREATED);
    }
}
