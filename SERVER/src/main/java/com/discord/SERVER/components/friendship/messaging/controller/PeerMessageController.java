package com.discord.SERVER.components.friendship.messaging.controller;

import com.discord.SERVER.components.friendship.messaging.dto.PeerMessageRequestDTO;
import com.discord.SERVER.components.friendship.messaging.dto.PeerMessageResponseDTO;
import com.discord.SERVER.components.friendship.messaging.service.PeerMessageService;
import com.discord.SERVER.security.CurrentUser;
import com.discord.SERVER.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/peerMessages")
public class PeerMessageController {

    private final PeerMessageService peerMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    public Integer sendMessage(
            @Payload
            PeerMessageRequestDTO requestDTO,
            Message<?> message
    ) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken)accessor.getUser();
        UserPrincipal authUser = (UserPrincipal)authentication.getPrincipal();
        PeerMessageResponseDTO responseDTO = peerMessageService.sendMessage(authUser.getId(), requestDTO);

        // send real time message through web socket
        messagingTemplate.convertAndSendToUser(
                requestDTO.receiverId().toString(),
                "/queue/messages",
                responseDTO
        );

        return 200;
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
