package com.discord.SERVER.config.webSocket;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

    @EventListener
    void handleWebSocketConnectListener() {
        log.info("new web socket connection");
    }

    @EventListener
    void handleWebSocketDisconnectListener() {
        log.info("user disconnected from websocket");
    }
}

