package com.discord.SERVER.components.friendship.relationship.friendsList.repository;

import com.discord.SERVER.entities.FriendsList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendListRepository extends JpaRepository<FriendsList, Long> {
}
