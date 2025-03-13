package com.discord.SERVER.components.servers.management.serverGroup.controller;

import com.discord.SERVER.components.servers.management.serverGroup.dto.CreateGroupRequestDTO;
import com.discord.SERVER.components.servers.management.serverGroup.dto.GroupResponseDTO;
import com.discord.SERVER.components.servers.management.serverGroup.dto.UpdateGroupRequestDTO;
import com.discord.SERVER.components.servers.management.serverGroup.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/groups")
public class GroupController {
    private final GroupService groupService;

    @PostMapping("/create")
    public ResponseEntity<GroupResponseDTO> create(
            @RequestBody CreateGroupRequestDTO requestDTO
    ) {
        return new ResponseEntity<>(groupService.createGroup(requestDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupResponseDTO> getGroup(
            @PathVariable Long groupId
    ) {
        return ResponseEntity.ok(groupService.getGroup(groupId));
    }

    @GetMapping("/server/{serverId}")
    public ResponseEntity<List<GroupResponseDTO>> getServerGroups(
            @PathVariable Long serverId
    ) {
        return ResponseEntity.ok(groupService.getServerGroups(serverId));
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<GroupResponseDTO> update(
            @RequestBody UpdateGroupRequestDTO requestDTO,
            @PathVariable Long groupId
    ) {
        return ResponseEntity.ok(groupService.updateGroup(requestDTO, groupId));
    }

    @DeleteMapping("{groupId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long groupId
    ) {
        groupService.deleteGroup(groupId);
        return ResponseEntity.noContent().build();
    }
}
