package com.discord.SERVER.components.friendship.relationship.friendsList.controller;


import com.discord.SERVER.components.friendship.relationship.friendsList.dto.FriendsListResponseDTO;
import com.discord.SERVER.components.friendship.relationship.friendsList.service.FriendsListService;
import com.discord.SERVER.security.CurrentUser;
import com.discord.SERVER.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/friends")
public class FriendsListController {

    private final FriendsListService friendsListService;

    @GetMapping("/getIndividualFriends")
    public ResponseEntity<List<FriendsListResponseDTO>> getIndividualFriends(
            @CurrentUser
            UserPrincipal authUser
    ) {
        return ResponseEntity.ok(friendsListService.getFriendsOfIndividual(authUser.getId()));
    }

    @DeleteMapping("/deleteFriend/{friendListId}")
    public ResponseEntity<Void> deleteFriend(
            @PathVariable
            Long friendListId
    ) {
        friendsListService.deleteFriend(friendListId);
        return ResponseEntity.noContent().build();
    }
}
