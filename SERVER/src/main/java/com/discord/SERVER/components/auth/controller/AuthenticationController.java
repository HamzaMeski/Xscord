package com.discord.SERVER.components.auth.controller;

import com.discord.SERVER.components.auth.dto.AuthenticationRequest;
import com.discord.SERVER.components.auth.dto.AuthenticationResponse;
import com.discord.SERVER.components.auth.dto.UserResponseDTO;
import com.discord.SERVER.components.auth.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @Valid @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/authenticatedUser")
    public ResponseEntity<UserResponseDTO> getAuthenticatedUser() {
        return ResponseEntity.ok(service.getAuthenticatedUser());
    }
}
