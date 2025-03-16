package com.discord.SERVER.components.servers.management.serverJoinDemand.controller;

import com.discord.SERVER.components.individual.dto.IndividualResponseDTO;
import com.discord.SERVER.components.servers.management.server.dto.ServerResponseDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandRequestDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.dto.ServerJoinDemandResponseDTO;
import com.discord.SERVER.components.servers.management.serverJoinDemand.service.ServerJoinDemandService;
import com.discord.SERVER.security.CurrentUser;
import com.discord.SERVER.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/serverJoinRequest")
@Slf4j
public class ServerJoinDemandController {
    private final ServerJoinDemandService service;

    @PostMapping("/send")
    public ResponseEntity<ServerJoinDemandResponseDTO> send(
            @RequestBody ServerJoinDemandRequestDTO requestDTO
    ) {
        return new ResponseEntity<>(service.sendRequest(requestDTO), HttpStatus.CREATED);
    }

    @PutMapping("/accept")
    private ResponseEntity<ServerJoinDemandResponseDTO> accept(
            @RequestBody ServerJoinDemandRequestDTO requestDTO
    ) {
        return ResponseEntity.ok(service.acceptRequest(requestDTO));
    }

    @GetMapping("/receiverInvitations/{receiverId}")
    public ResponseEntity<List<ServerJoinDemandResponseDTO>> getIndividualInvitations(
            @PathVariable Long receiverId
    ) {
        return ResponseEntity.ok(service.getIndividualInvitations(receiverId));
    }

    @GetMapping("/serverMembers/{serverId}")
    public ResponseEntity<List<IndividualResponseDTO>> getServerMembers(
            @PathVariable Long serverId
    ) {
        return ResponseEntity.ok(service.getServerMembers(serverId));
    }

    @GetMapping("/memberJoinedServers")
    public ResponseEntity<List<ServerResponseDTO>> getMemberJoinedServers(
            @CurrentUser UserPrincipal authUser
            ) {
        Long memberId = authUser.getId();
        return ResponseEntity.ok(service.getMemberJoinedServers(memberId));
    }

    @DeleteMapping("/refuse/{requestId}")
    private ResponseEntity<Void> refuse(
            @PathVariable Long requestId
    ) {
        service.refuseRequest(requestId);

        return ResponseEntity.noContent().build();
    }
}
