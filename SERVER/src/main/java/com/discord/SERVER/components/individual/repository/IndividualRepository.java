package com.discord.SERVER.components.individual.repository;

import com.discord.SERVER.entities.Individual;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IndividualRepository extends JpaRepository<Individual, Long> {
    Optional<Individual> findByEmail(String email);
}
