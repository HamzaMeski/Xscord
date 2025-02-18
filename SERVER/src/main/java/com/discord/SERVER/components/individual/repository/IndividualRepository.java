package com.discord.SERVER.components.individual.repository;

import com.discord.SERVER.entities.Individual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface IndividualRepository extends JpaRepository<Individual, Long> {
    Optional<Individual> findByEmail(String email);
    Boolean existsByEmail(String email);

    @Query("""
        SELECT CASE
            WHEN COUNT(i) > 0 THEN true
            ELSE false
        END
        FROM Individual i
        WHERE i.email = :email
        AND i.id != :id
    """)
    Boolean checkEmailForUpdate(String email, Long id);
}
