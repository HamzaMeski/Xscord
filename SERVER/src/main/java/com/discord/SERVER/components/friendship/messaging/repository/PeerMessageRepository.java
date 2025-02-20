package com.discord.SERVER.components.friendship.messaging.repository;

import com.discord.SERVER.entities.PeerMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PeerMessageRepository extends JpaRepository<PeerMessage, Long> {

    @Query("""
        SELECT pm FROM PeerMessage pm
        WHERE (pm.receiver.id = :individualId1 AND pm.sender.id = :individualId2)
        OR (pm.receiver.id = :individualId2 AND pm.sender.id = :individualId1 )
    """)
    List<PeerMessage> getChatHistory(Long individualId1, Long individualId2);

    @Query("""
        SELECT COUNT(pm) FROM PeerMessage pm
        WHERE (pm.receiver.id = :id AND pm.isRead = false)
    """)
    Long getUnreadMessagesCount(Long receiverId);
}
