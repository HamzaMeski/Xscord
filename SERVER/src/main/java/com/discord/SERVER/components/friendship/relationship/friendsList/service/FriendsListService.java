package com.discord.SERVER.components.friendship.relationship.friendsList.service;

import com.discord.SERVER.components.friendship.relationship.friendsList.dto.FriendsListResponseDTO;

import java.util.List;

public interface FriendsListService {
    List<FriendsListResponseDTO> getFriendsOfIndividual(Long individualId);
    void deleteFriend(Long friendsListId);
}
