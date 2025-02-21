package com.discord.SERVER.components.friendship.relationship.friendShipDemand.repository;

import com.discord.SERVER.entities.FriendShipDemand;
import com.discord.SERVER.entities.Individual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FriendShipDemandRepository extends JpaRepository<FriendShipDemand, Long> {
    @Query("""
            SELECT fsd
            FROM FriendShipDemand fsd
            WHERE fsd.receiver = :individual
    """)
    List<FriendShipDemand> getFriendShipRequestsForIndividual(Individual individual);
}
