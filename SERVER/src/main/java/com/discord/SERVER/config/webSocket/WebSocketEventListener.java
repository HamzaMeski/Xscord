package com.discord.SERVER.config.webSocket;

import com.discord.SERVER.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


/*
    .Connection monitoring
    .User presence (online/offline)
    .Connection cleanup
    .Event logging
*/
@Component
@Slf4j
public class WebSocketEventListener {

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        UserPrincipal user = (UserPrincipal) ((UsernamePasswordAuthenticationToken) headerAccessor.getUser()).getPrincipal();
        log.info("Received a new web socket connection from user: {}", user.getId());
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        UserPrincipal user = (UserPrincipal) ((UsernamePasswordAuthenticationToken) headerAccessor.getUser()).getPrincipal();
        log.info("User disconnected: {}", user.getId());
    }
}