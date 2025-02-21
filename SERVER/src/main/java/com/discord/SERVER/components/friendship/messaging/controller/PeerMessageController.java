package com.discord.SERVER.components.friendship.messaging.controller;

import com.discord.SERVER.components.friendship.messaging.dto.PeerMessageRequestDTO;
import com.discord.SERVER.components.friendship.messaging.dto.PeerMessageResponseDTO;
import com.discord.SERVER.components.friendship.messaging.service.PeerMessageService;
import com.discord.SERVER.security.CurrentUser;
import com.discord.SERVER.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/peerMessages")
public class PeerMessageController {

    private final PeerMessageService peerMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    public ResponseEntity<PeerMessageResponseDTO> sendMessage(
            @CurrentUser
            UserPrincipal authUser,
            @Valid
            @RequestBody
            PeerMessageRequestDTO requestDTO
    ) {
        PeerMessageResponseDTO responseDTO = peerMessageService.sendMessage(authUser.getId(), requestDTO);

        // send real time message through web socket
        messagingTemplate.convertAndSendToUser(
                requestDTO.receiverId().toString(),
                "/queue/messages",
                responseDTO
        );

        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @MessageMapping("/chat.markAsRead")
    public ResponseEntity<PeerMessageResponseDTO> markAsRead(
            @PathVariable
            Long messageId
    ) {
        PeerMessageResponseDTO responseDTO = peerMessageService.markAsRead(messageId);

        // notify sender that message was read
        messagingTemplate.convertAndSendToUser(
                responseDTO.sender().getId().toString(),
                "/queue/read-receipts",
                responseDTO
        );
        return ResponseEntity.ok(responseDTO);
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
