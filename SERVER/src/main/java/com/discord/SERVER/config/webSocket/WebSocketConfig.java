package com.discord.SERVER.config.webSocket;

import com.discord.SERVER.security.JwtService;
import com.discord.SERVER.security.UserPrincipal;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.Collections;


/*
    .How messages are routed
    .Where clients connect
    .security settings
    .Messages destinations
*/
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public WebSocketConfig(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-message")
                .setAllowedOrigins("http://localhost:4200")
                .withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    String token = accessor.getFirstNativeHeader("Authorization");
                    if (token != null && token.startsWith("Bearer ")) {
                        String jwt = token.substring(7);
                        String username = jwtService.extractUsername(jwt);

                        if (username != null) {
                            // Get fresh UserPrincipal for this connection
                            UserPrincipal userPrincipal = (UserPrincipal) userDetailsService
                                    .loadUserByUsername(username);

                            if (jwtService.isTokenValid(jwt, userPrincipal)) {
                                // Set the authenticated user with the UserPrincipal
                                accessor.setUser(new UsernamePasswordAuthenticationToken(
                                        userPrincipal,  // Use the actual UserPrincipal
                                        null,
                                        userPrincipal.getAuthorities()
                                ));
                            }
                        }
                    }
                }
                return message;
            }
        });
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");     // = Where clients send messages TO backend socket
        registry.enableSimpleBroker("/queue"); // = Where clients receive messages FROM backend socket
        registry.setUserDestinationPrefix("/user");             // = How messages get routed to specific users
    }
}
