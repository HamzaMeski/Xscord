package com.discord.SERVER.components.servers.management.serverJoinDemand.controller;

import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandRequestDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandResponseDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.service.ServerJoinDemandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/serverJoinRequest")
public class ServerJoinDemandController {
    private final ServerJoinDemandService service;

    @PostMapping("/send")
    public ResponseEntity<ServerJoinDemandResponseDTO> send(
            @RequestBody ServerJoinDemandRequestDTO requestDTO
    ) {
        return new ResponseEntity<>(service.sendRequest(requestDTO), HttpStatus.CREATED);
    }

    @PutMapping("/accept/{requestId}")
    private ResponseEntity<ServerJoinDemandResponseDTO> accept(
            @PathVariable Long requestId
    ) {
        return ResponseEntity.ok(service.acceptRequest(requestId));
    }

    @DeleteMapping("/refuse/{requestId}")
    private ResponseEntity<Void> refuse(
            @PathVariable Long requestId
    ) {
        service.refuseRequest(requestId);

        return ResponseEntity.noContent().build();
    }
}
