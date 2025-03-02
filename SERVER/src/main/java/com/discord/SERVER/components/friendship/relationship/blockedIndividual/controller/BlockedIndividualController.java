package com.discord.SERVER.components.friendship.relationship.blockedIndividual.controller;

import com.discord.SERVER.components.friendship.relationship.blockedIndividual.dto.BlockedIndividualResponseDTO;
import com.discord.SERVER.components.friendship.relationship.blockedIndividual.service.BlockedIndividualService;
import com.discord.SERVER.security.CurrentUser;
import com.discord.SERVER.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/individuals")
public class BlockedIndividualController {

    private final BlockedIndividualService blockedIndividualService;

    @PostMapping("/block/{individualId}")
    ResponseEntity<BlockedIndividualResponseDTO> blockIndividual(
            @PathVariable
            Long individualId,
            @CurrentUser
            UserPrincipal authUser
    ) {
        return new ResponseEntity<>(blockedIndividualService.blockIndividual(authUser.getId(), individualId),HttpStatus.CREATED);
    }

    @DeleteMapping("/unBlock/{blockId}")
    ResponseEntity<Void> unBlockInidividual(
            @PathVariable
            Long blockId
    ) {
        blockedIndividualService.unBlockIndividual(blockId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getBlockedPersonsOfIndividual")
    ResponseEntity<List<BlockedIndividualResponseDTO>> getBlockedPersonsOfIndividual(
            @CurrentUser
            UserPrincipal authUser
    ) {
        return ResponseEntity.ok(blockedIndividualService.getBlockedPersonsOfIndividual(authUser.getId()));
    }
}
