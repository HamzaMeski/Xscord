package com.discord.SERVER.components.servers.messaging.repository;

import com.discord.SERVER.entities.Group;
import com.discord.SERVER.entities.GroupMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMessageRepository extends JpaRepository<GroupMessage, Long> {
    @Query("""
        SELECT gm FROM GroupMessage gm
        WHERE (gm.group = :group)
    """)
    List<GroupMessage> getGroupMessages(Group group);
}
