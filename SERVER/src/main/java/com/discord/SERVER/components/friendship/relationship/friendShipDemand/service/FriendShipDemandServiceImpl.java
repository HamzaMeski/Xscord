package com.discord.SERVER.components.friendship.relationship.friendShipDemand.service;

import com.discord.SERVER.components.friendship.relationship.friendShipDemand.dto.FriendShipDemandResponseDTO;
import com.discord.SERVER.components.friendship.relationship.friendShipDemand.mapper.FriendShipDemandMapper;
import com.discord.SERVER.components.friendship.relationship.friendShipDemand.repository.FriendShipDemandRepository;
import com.discord.SERVER.components.individual.repository.IndividualRepository;
import com.discord.SERVER.entities.FriendShipDemand;
import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.exception.ResourceNotFoundException;
import com.discord.SERVER.exception.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendShipDemandServiceImpl implements FriendShipDemandService {

    private final FriendShipDemandRepository friendShipDemandRepository;
    private final IndividualRepository individualRepository;
    private final FriendShipDemandMapper friendShipDemandMapper;

    @Override
    public FriendShipDemandResponseDTO sendFriendShipRequest(Long requesterId, Long receiverId) {
        Individual requester = individualRepository.findById(requesterId)
                .orElseThrow(() -> new ResourceNotFoundException("requester with that id doesn't exist."));

        Individual receiver = individualRepository.findById(receiverId)
                .orElseThrow(() -> new ResourceNotFoundException("receiver with that id doesn't exist."));

        FriendShipDemand friendShipDemand = FriendShipDemand.builder()
                .requester(requester)
                .receiver(receiver)
                .build();

        return friendShipDemandMapper.toResponse(friendShipDemandRepository.save(friendShipDemand));
    }

    @Override
    public FriendShipDemandResponseDTO acceptRequest(Long requestId) {
        FriendShipDemand friendShipDemand = friendShipDemandRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("friendship demand with that id doesn't exist."));

        friendShipDemand.setAccepted(true);
        return friendShipDemandMapper.toResponse(friendShipDemandRepository.save(friendShipDemand));
    }

    @Override
    public void ignoreRequest(Long requestId) {
        FriendShipDemand friendShipDemand = friendShipDemandRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("friendship demand with that id doesn't exist."));

        if(friendShipDemand.isAccepted()) {
            throw new ValidationException("friendship demand already accepted can not be ignored.");
        }

        friendShipDemandRepository.delete(friendShipDemand);
    }

    @Override
    public List<FriendShipDemandResponseDTO> getFriendShipRequestsForIndividual(Long individualId) {
        Individual individual = individualRepository.findById(individualId)
                .orElseThrow(() -> new ResourceNotFoundException("individual with that id doesn't exist."));

        return friendShipDemandRepository.getFriendShipRequestsForIndividual(individual)
                .stream()
                .map(friendShipDemandMapper::toResponse)
                .toList();
    }
}
