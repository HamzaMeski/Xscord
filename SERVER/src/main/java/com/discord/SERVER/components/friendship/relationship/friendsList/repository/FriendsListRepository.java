package com.discord.SERVER.components.friendship.relationship.friendsList.repository;

import com.discord.SERVER.entities.FriendsList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendsListRepository extends JpaRepository<FriendsList, Long> {
    @Query("""
        SELECT fl
        FROM FriendsList fl
        WHERE fl.individual1.id = :individualId
        OR fl.individual2.id = :individualId
    """)
    List<FriendsList> getFriendsOfIndividual(Long individualId);
}
