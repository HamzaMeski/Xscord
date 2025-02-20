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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/peerMessages")
public class PeerMessageController {

    private final PeerMessageService peerMessageService;

    @PostMapping("/sendMessage")
    public ResponseEntity<PeerMessageResponseDTO> sendMessage(
            @CurrentUser
            UserPrincipal authUser,
            @Valid
            @RequestBody
            PeerMessageRequestDTO requestDTO
    ) {
        return new ResponseEntity<>(peerMessageService.sendMessage(authUser.getId(), requestDTO), HttpStatus.CREATED);
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

    @PutMapping("/markAsRead/{messageId}")
    public ResponseEntity<PeerMessageResponseDTO> markAsRead(
            @PathVariable
            Long messageId
    ) {
        return ResponseEntity.ok(peerMessageService.markAsRead(messageId));
    }


    @GetMapping("/getUnreadMessagesCount")
    public ResponseEntity<Long> getUnreadMessagesCount(
            @CurrentUser
            UserPrincipal authUser
    ) {
        return ResponseEntity.ok(peerMessageService.getUnreadMessagesCount(authUser.getId()));
    }
}
