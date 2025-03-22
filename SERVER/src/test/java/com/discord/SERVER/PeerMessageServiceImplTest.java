package com.discord.SERVER;

import com.discord.SERVER.components.friendship.messaging.dto.PeerMessageRequestDTO;
import com.discord.SERVER.components.friendship.messaging.repository.PeerMessageRepository;
import com.discord.SERVER.components.friendship.messaging.service.PeerMessageServiceImpl;
import com.discord.SERVER.components.individual.repository.IndividualRepository;
import com.discord.SERVER.entities.Individual;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
public class PeerMessageServiceImplTest {
    @Mock
    private PeerMessageRepository peerMessageRepository;

    @Mock
    private IndividualRepository individualRepository;

    @InjectMocks
    private PeerMessageServiceImpl peerMessageService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSendMessage_SenderNotFound() {
        // Arrange
        Long senderId = 1L;
        Long receiverId = 2L;
        PeerMessageRequestDTO requestDTO = new PeerMessageRequestDTO(receiverId, "Hello!");

        when(individualRepository.findById(senderId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> peerMessageService.sendMessage(senderId, requestDTO))
                .isInstanceOf(NoSuchElementException.class);

        verify(individualRepository).findById(senderId);
        verify(individualRepository, never()).findById(receiverId);
        verify(peerMessageRepository, never()).save(any());
    }

    @Test
    void testSendMessage_ReceiverNotFound() {
        // Arrange
        Long senderId = 1L;
        Long receiverId = 2L;
        PeerMessageRequestDTO requestDTO = new PeerMessageRequestDTO(receiverId, "Hello!");

        Individual sender = new Individual(); sender.setId(senderId);

        when(individualRepository.findById(senderId)).thenReturn(Optional.of(sender));
        when(individualRepository.findById(receiverId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> peerMessageService.sendMessage(senderId, requestDTO))
                .isInstanceOf(NoSuchElementException.class);

        verify(individualRepository).findById(senderId);
        verify(individualRepository).findById(receiverId);
        verify(peerMessageRepository, never()).save(any());
    }
}
