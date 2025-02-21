package com.discord.SERVER.components.friendship.relationship.friendsList.service;

import com.discord.SERVER.components.friendship.relationship.friendsList.dto.FriendsListResponseDTO;
import com.discord.SERVER.components.friendship.relationship.friendsList.mapper.FriendsListMapper;
import com.discord.SERVER.components.friendship.relationship.friendsList.repository.FriendsListRepository;
import com.discord.SERVER.entities.FriendsList;
import com.discord.SERVER.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendsListServiceImpl implements FriendsListService {

    private final FriendsListRepository friendsListRepository;
    private final FriendsListMapper friendsListMapper;

    @Override
    public List<FriendsListResponseDTO> getFriendsOfIndividual(Long individualId) {
        return friendsListRepository.getFriendsOfIndividual(individualId).stream()
                .map(friendsListMapper::toResponse)
                .toList();
    }

    @Override
    public void deleteFriend(Long friendsListId) {
        FriendsList friendsList = friendsListRepository.findById(friendsListId)
                .orElseThrow(() -> new ResourceNotFoundException("friends list with that id doesn't exist"));

        friendsListRepository.delete(friendsList);
    }
}
