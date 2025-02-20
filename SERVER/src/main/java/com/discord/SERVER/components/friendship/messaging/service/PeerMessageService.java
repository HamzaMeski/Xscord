package com.discord.SERVER.components.friendship.messaging.service;

import com.discord.SERVER.components.friendship.messaging.dto.PeerMessageRequestDTO;
import com.discord.SERVER.components.friendship.messaging.dto.PeerMessageResponseDTO;
import com.discord.SERVER.components.friendship.messaging.repository.PeerMessageRepository;

import java.util.List;

public interface PeerMessageService {
    PeerMessageResponseDTO sendMessage(Long senderId, PeerMessageRequestDTO requestDTO);
    List<PeerMessageResponseDTO> getChatHistory(Long individualId1, Long individualId2);
    PeerMessageResponseDTO markAsRead(Long peerMessageId);
    Long getUnreadMessagesCount(Long receiverId);
}
