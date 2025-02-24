package com.discord.SERVER.security;
import com.discord.SERVER.components.admin.repository.AdminRepository;
import com.discord.SERVER.components.individual.repository.IndividualRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final IndividualRepository individualRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("Attempting to load user by email: {}", email);
        
        // Try to find user in admin table
        return adminRepository.findByEmail(email)
                .map(admin -> {
                    log.info("Found admin user: {}", admin.getEmail());
                    return UserPrincipal.builder()
                            .id(admin.getId())
                            .email(admin.getEmail())
                            .password(admin.getPassword())
                            .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")))
                            .build();
                })
                // If not found, try individual table
                .orElseGet(() -> individualRepository.findByEmail(email)
                        .map(individual -> {
                            log.info("Found collector user: {}", individual.getEmail());
                            return UserPrincipal.builder()
                                    .id(individual.getId())
                                    .email(individual.getEmail())
                                    .password(individual.getPassword())
                                    .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_INDIVIDUAL")))
                                    .build();
                        })
                        // If not found, try household table
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"))
                );

    }
}
