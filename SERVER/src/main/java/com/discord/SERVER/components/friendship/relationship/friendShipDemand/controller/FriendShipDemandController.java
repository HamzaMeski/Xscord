package com.discord.SERVER.components.friendship.relationship.friendShipDemand.controller;

import com.discord.SERVER.components.friendship.relationship.friendShipDemand.dto.FriendShipDemandResponseDTO;
import com.discord.SERVER.components.friendship.relationship.friendShipDemand.service.FriendShipDemandService;
import com.discord.SERVER.security.CurrentUser;
import com.discord.SERVER.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/friendShipDemand")
public class FriendShipDemandController {

    private final FriendShipDemandService friendShipDemandService;

    @PostMapping("/sendRequest/{receiverId}")
    public ResponseEntity<FriendShipDemandResponseDTO> sendFriendShipRequest(
            @PathVariable
            Long receiverId,
            @CurrentUser
            UserPrincipal authUser
    ) {
        return new ResponseEntity<>(friendShipDemandService.sendFriendShipRequest(authUser.getId(), receiverId), HttpStatus.CREATED);
    }

    @PutMapping("/acceptRequest/{requestId}")
    public ResponseEntity<FriendShipDemandResponseDTO> acceptRequest(
            @PathVariable
            Long requestId
    ) {
        return ResponseEntity.ok(friendShipDemandService.acceptRequest(requestId));
    }

    @DeleteMapping("/ignoreRequest/{requestId}")
    public ResponseEntity<Void> ignoreRequest(
            @PathVariable
            Long requestId
    ) {
        friendShipDemandService.ignoreRequest(requestId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getFriendShipRequestsForIndividual")
    public ResponseEntity<List<FriendShipDemandResponseDTO>> getFriendShipRequestsForIndividual(
            @CurrentUser
            UserPrincipal authUser
    ) {
        return ResponseEntity.ok(friendShipDemandService.getFriendShipRequestsForIndividual(authUser.getId()));
    }
}
