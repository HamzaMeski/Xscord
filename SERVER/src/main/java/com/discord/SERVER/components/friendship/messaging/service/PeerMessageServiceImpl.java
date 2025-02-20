package com.discord.SERVER.components.friendship.messaging.service;

import com.discord.SERVER.components.friendship.messaging.dto.PeerMessageRequestDTO;
import com.discord.SERVER.components.friendship.messaging.dto.PeerMessageResponseDTO;
import com.discord.SERVER.components.friendship.messaging.mapper.PeerMessageMapper;
import com.discord.SERVER.components.friendship.messaging.repository.PeerMessageRepository;
import com.discord.SERVER.components.individual.repository.IndividualRepository;
import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.entities.MessageResource;
import com.discord.SERVER.entities.PeerMessage;
import com.discord.SERVER.exception.ResourceNotFoundException;
import com.discord.SERVER.exception.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PeerMessageServiceImpl implements PeerMessageService{

    private final PeerMessageRepository peerMessageRepository;
    private final IndividualRepository individualRepository;
    private final PeerMessageMapper peerMessageMapper;

    @Override
    public PeerMessageResponseDTO sendMessage(Long senderId, PeerMessageRequestDTO requestDTO) {
        Individual sender = individualRepository.findById(senderId)
                .orElseThrow();

        Individual receiver = individualRepository.findById(requestDTO.receiverId())
                .orElseThrow();

        PeerMessage message = PeerMessage.builder()
                .sender(sender)
                .receiver(receiver)
                .content(requestDTO.content())
                .build();

        return peerMessageMapper.toResponse(peerMessageRepository.save(message));
    }

    @Override
    public List<PeerMessageResponseDTO> getChatHistory(Long individualId1, Long individualId2) {

        return peerMessageRepository.getChatHistory(individualId1, individualId2).stream()
                .map(peerMessageMapper::toResponse)
                .toList();
    }

    @Override
    public void markAsRead(Long peerMessageId) {
        PeerMessage message = peerMessageRepository.findById(peerMessageId)
                .orElseThrow(() -> new ResourceNotFoundException("message with that id doesn't exist"));

        message.setRead(true);
    }

    @Override
    public Long getUnreadMessagesCount(Long receiverId) {
        return peerMessageRepository.getUnreadMessagesCount(receiverId);
    }
}
