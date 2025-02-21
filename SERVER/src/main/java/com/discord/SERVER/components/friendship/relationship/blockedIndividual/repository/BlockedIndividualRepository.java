package com.discord.SERVER.components.friendship.relationship.blockedIndividual.repository;

import com.discord.SERVER.components.friendship.relationship.blockedIndividual.dto.BlockedIndividualResponseDTO;
import com.discord.SERVER.entities.BlockedIndividual;
import com.discord.SERVER.entities.Individual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlockedIndividualRepository extends JpaRepository<BlockedIndividual, Long> {

    @Query("""
        SELECT bi
        FROM BlockedIndividual bi
        WHERE bi.blocker = :individual
    """)
    List<BlockedIndividual> getBlockedPersonsOfIndividual(Individual individual);
}
