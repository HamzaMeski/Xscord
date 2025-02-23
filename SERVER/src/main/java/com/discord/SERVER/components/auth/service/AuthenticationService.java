package com.discord.SERVER.components.auth.service;

import com.discord.SERVER.components.auth.dto.AuthenticationRequest;
import com.discord.SERVER.components.auth.dto.AuthenticationResponse;
import com.discord.SERVER.components.admin.repository.AdminRepository;
import com.discord.SERVER.components.individual.repository.IndividualRepository;
import com.discord.SERVER.entities.Admin;
import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.entities.User;
import com.discord.SERVER.exception.AuthenticationException;
import com.discord.SERVER.security.JwtService;
import com.discord.SERVER.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AdminRepository adminRepository;
    private final IndividualRepository individualRepository;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        log.info("Attempting authentication for email: {}", request.getEmail());
        
        // Try to authenticate
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );
            log.info("Authentication successful for email: {}", request.getEmail());
        } catch (Exception e) {
            log.error("Authentication failed for email: {}", request.getEmail(), e);
            throw new AuthenticationException("Invalid email or password");
        }

        // Find user in appropriate repository
        return adminRepository.findByEmail(request.getEmail())
                .map(admin -> {
                    log.info("Building auth response for admin: {}", admin.getEmail());
                    return buildAuthResponse(admin);
                })
                        .orElseGet(() -> individualRepository.findByEmail(request.getEmail())
                                .map(individual -> {
                                    log.info("Building auth response for individual: {}", individual.getEmail());
                                    return buildAuthResponse(individual);
                                })
                                .orElseThrow(() -> {
                                    log.error("No user found with email: {}", request.getEmail());
                                    return new AuthenticationException("User not found");
                                })
                        );
    }

    private AuthenticationResponse buildAuthResponse(Admin admin) {
        String token = jwtService.generateToken(admin.getEmail(), admin.getId());
        return AuthenticationResponse.builder()
                .token(token)
                .userId(admin.getId())
                .email(admin.getEmail())
                .firstName(admin.getFirstName())
                .lastName(admin.getLastName())
                .role("ROLE_ADMIN")
                .build();
    }

    private AuthenticationResponse buildAuthResponse(Individual individual) {
        String token = jwtService.generateToken(individual.getEmail(), individual.getId());
        return AuthenticationResponse.builder()
                .token(token)
                .userId(individual.getId())
                .email(individual.getEmail())
                .firstName(individual.getFirstName())
                .lastName(individual.getLastName())
                .role("ROLE_INDIVIDUAL")
                .build();
    }


    public AuthenticationResponse getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userId = userPrincipal.getId();

        String role = authentication.getAuthorities()
                .stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse(null);

        AuthenticationResponse authenticationResponse = new AuthenticationResponse();

        if (role.equals("ROLE_ADMIN")) {
            Admin admin = adminRepository.findById(userId)
                            .orElseThrow();
            authenticationResponse.setUserId(admin.getId());
            authenticationResponse.setFirstName(admin.getFirstName());
            authenticationResponse.setLastName(admin.getLastName());
            authenticationResponse.setEmail(admin.getEmail());
            authenticationResponse.setRole("ROLE_ADMIN");
        } else if (role.equals("ROLE_INDIVIDUAL")) {
            Individual individual = individualRepository.findById(userId)
                    .orElseThrow();
            authenticationResponse.setUserId(individual.getId());
            authenticationResponse.setFirstName(individual.getFirstName());
            authenticationResponse.setLastName(individual.getLastName());
            authenticationResponse.setEmail(individual.getEmail());
            authenticationResponse.setRole("ROLE_INDIVIDUAL");
        }

        return  authenticationResponse;
    }
}
