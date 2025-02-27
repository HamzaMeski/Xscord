package com.discord.SERVER.components.friendship.relationship.friendsList.service;

import com.discord.SERVER.components.friendship.relationship.friendShipDemand.repository.FriendShipDemandRepository;
import com.discord.SERVER.components.friendship.relationship.friendsList.dto.FriendsListResponseDTO;
import com.discord.SERVER.components.friendship.relationship.friendsList.mapper.FriendsListMapper;
import com.discord.SERVER.components.friendship.relationship.friendsList.repository.FriendsListRepository;
import com.discord.SERVER.entities.FriendsList;
import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendsListServiceImpl implements FriendsListService {

    private final FriendsListRepository friendsListRepository;
    private final FriendsListMapper friendsListMapper;
    private final FriendShipDemandRepository friendShipDemandRepository;

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

        Individual individual1 = friendsList.getIndividual1();
        Individual individual2 = friendsList.getIndividual2();

        friendShipDemandRepository.deleteFriendShipDemand(individual1, individual2);

        friendsListRepository.delete(friendsList);
    }
}
