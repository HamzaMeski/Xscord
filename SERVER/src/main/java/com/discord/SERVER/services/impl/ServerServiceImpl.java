package com.discord.SERVER.services.impl;

import com.discord.SERVER.entities.Server;
import com.discord.SERVER.repositories.ServerRepository;
import com.discord.SERVER.services.ServerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ServerServiceImpl implements ServerService {

    private final ServerRepository serverRepository;

    @Override
    public void createServer() {
        log.info("***************** server creation *****************");
        Server server = new Server();
        server.setName("Testing Server");
        serverRepository.save(server);
    }

    @Override
    public void deleteServer() {
        log.info("***************** server deletion ***************");
        Server server = serverRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("server not found with that ID"));
        serverRepository.delete(server);
    }
}
