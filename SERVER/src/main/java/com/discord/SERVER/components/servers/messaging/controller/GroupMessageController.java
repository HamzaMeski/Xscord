package com.discord.SERVER.components.servers.messaging.controller;

import com.discord.SERVER.components.servers.messaging.dto.GroupMessageRequestDTO;
import com.discord.SERVER.components.servers.messaging.dto.GroupMessageResponseDTO;
import com.discord.SERVER.components.servers.messaging.service.GroupMessageService;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/groupMessages")
public class GroupMessageController {

    private final GroupMessageService groupMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/group.chat.sendMessage")
    public void sendMessage(
            @Payload GroupMessageRequestDTO requestDTO,
            Message<?> message
    ) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken)accessor.getUser();
        UserPrincipal authUser = (UserPrincipal)authentication.getPrincipal();

        GroupMessageResponseDTO responseDTO = groupMessageService.sendMessage(authUser.getId(), requestDTO);
        String destination = "/topic/group.messages." + requestDTO.groupId();

        messagingTemplate.convertAndSend(destination, responseDTO);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<List<GroupMessageResponseDTO>> getGroupMessages(
            @PathVariable
            Long groupId
    ) {
        return ResponseEntity.ok(groupMessageService.getGroupMessages(groupId));
    }
}
