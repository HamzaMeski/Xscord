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

    @Query("""
            DELETE FROM FriendShipDemand fsd
            WHERE
            (fsd.receiver = :individual1 AND fsd.requester = :individual2)
            OR
            (fsd.receiver = :individual2 AND fsd.requester = :individual1)
    """)
    void deleteFriendShipDemand(Individual individual1, Individual individual2);

    @Query("""
            SELECT CASE WHEN COUNT(fsd) > 0 THEN true ELSE false END
            FROM FriendShipDemand fsd
            WHERE
            (fsd.receiver = :individual1 AND fsd.requester = :individual2 AND fsd.accepted = false)
            OR
            (fsd.receiver = :individual2 AND fsd.requester = :individual1 AND fsd.accepted = false)
    """)
    boolean isAlreadyExistsWithFalse(Individual individual1, Individual individual2);

    @Query("""
            SELECT CASE WHEN COUNT(fsd) > 0 THEN true ELSE false END
            FROM FriendShipDemand fsd
            WHERE
            (fsd.receiver = :individual1 AND fsd.requester = :individual2 AND fsd.accepted = true)
            OR
            (fsd.receiver = :individual2 AND fsd.requester = :individual1 AND fsd.accepted = true)
    """)
    boolean isAlreadyExistsWithTrue(Individual individual1, Individual individual2);
}
