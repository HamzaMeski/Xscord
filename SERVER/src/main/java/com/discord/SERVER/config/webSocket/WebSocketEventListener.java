package com.discord.SERVER.config.webSocket;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

    @EventListener
    void handleWebSocketConnectListener(SessionConnectedEvent event) {
        log.info("new web socket connection");
    }

    @EventListener
    void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("user disconnected from websocket");
    }
}

