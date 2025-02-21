package com.discord.SERVER.components.individual.controller;

import com.discord.SERVER.components.individual.dto.IndividualRequestDTO;
import com.discord.SERVER.components.individual.dto.IndividualResponseDTO;
import com.discord.SERVER.components.individual.service.IndividualService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public ResponseEntity<IndividualResponseDTO> getProfile(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(individualService.getProfile(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<IndividualResponseDTO> updateProfile(
            @Valid
            @RequestBody
            IndividualRequestDTO requestDTO,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(individualService.updateProfile(id, requestDTO));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProfile(
            @PathVariable Long id
    ) {
        individualService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }
}
