package com.discord.SERVER.components.friendship.messaging.controller;

import com.discord.SERVER.components.friendship.messaging.dto.PeerMessageRequestDTO;
import com.discord.SERVER.components.friendship.messaging.dto.PeerMessageResponseDTO;
import com.discord.SERVER.components.friendship.messaging.service.PeerMessageService;
import com.discord.SERVER.security.CurrentUser;
import com.discord.SERVER.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/peerMessages")
public class PeerMessageController {

    private final PeerMessageService peerMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(
            @Payload PeerMessageRequestDTO requestDTO,
            Message<?> message
    ) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken)accessor.getUser();
        UserPrincipal authUser = (UserPrincipal)authentication.getPrincipal();

        log.info("Received message request from user {} to user {}", authUser.getId(), requestDTO.receiverId());

        PeerMessageResponseDTO responseDTO = peerMessageService.sendMessage(authUser.getId(), requestDTO);

        try {
            String destination = "/topic/messages." + requestDTO.receiverId();
            log.info("Sending message to destination: {}", destination);

            messagingTemplate.convertAndSend(destination, responseDTO);

        } catch (Exception e) {
            log.error("Failed to send WebSocket message", e);
            e.printStackTrace();
        }
    }

    
    @MessageMapping("/chat.markAsRead")
    public void markAsRead(
            @Payload
            Long messageId
    ) {
        PeerMessageResponseDTO responseDTO = peerMessageService.markAsRead(messageId);

        // notify sender that message was read
        messagingTemplate.convertAndSendToUser(
                responseDTO.sender().getId().toString(),
                "/queue/read-receipts",
                responseDTO
        );
    }

    @GetMapping("/getChatHistory/{individual2Id}")
    public ResponseEntity<List<PeerMessageResponseDTO>> getChatHistory(
            @PathVariable
            Long individual2Id,
            @CurrentUser
            UserPrincipal authUser
    ) {
        return ResponseEntity.ok(peerMessageService.getChatHistory(authUser.getId(), individual2Id));
    }

    @GetMapping("/getUnreadMessagesCount")
    public ResponseEntity<Long> getUnreadMessagesCount(
            @CurrentUser
            UserPrincipal authUser
    ) {
        return ResponseEntity.ok(peerMessageService.getUnreadMessagesCount(authUser.getId()));
    }
}
