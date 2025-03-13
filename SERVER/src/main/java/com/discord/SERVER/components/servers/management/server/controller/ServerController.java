package com.discord.SERVER.components.servers.management.server.controller;

import com.discord.SERVER.components.servers.management.server.dto.ServerRequestDTO;
import com.discord.SERVER.components.servers.management.server.dto.ServerResponseDTO;
import com.discord.SERVER.components.servers.management.server.service.ServerService;
import com.discord.SERVER.security.CurrentUser;
import com.discord.SERVER.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/servers")
public class ServerController {
    private final ServerService serverService;

    @PostMapping("/create")
    public ResponseEntity<ServerResponseDTO> createServer(
            @CurrentUser UserPrincipal authUser,
            @RequestBody ServerRequestDTO serverRequestDTO
    ) {
        Long serverOwnerId = authUser.getId();
        return new ResponseEntity<>(serverService.createServer(serverRequestDTO, serverOwnerId), HttpStatus.CREATED);
    }

    @GetMapping("/individualServers")
    public ResponseEntity<List<ServerResponseDTO>> getIndividualServers(
            @CurrentUser UserPrincipal authUser
    ) {
        return ResponseEntity.ok(serverService.getIndividualServers(authUser.getId()));
    }

    @GetMapping("/{serverId}")
    public ResponseEntity<ServerResponseDTO> getServer(
            @PathVariable Long serverId
    ) {
        return ResponseEntity.ok(serverService.getServer(serverId));
    }

    @DeleteMapping("/{serverId}")
    public ResponseEntity<Void> deleteServer(
            @PathVariable Long serverId
    ) {
        serverService.deleteServer(serverId);
        return ResponseEntity.noContent().build();
    }
}
