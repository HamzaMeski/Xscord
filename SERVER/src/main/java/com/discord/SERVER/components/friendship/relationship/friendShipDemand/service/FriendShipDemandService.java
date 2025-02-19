package com.discord.SERVER.components.friendship.relationship.friendShipDemand.service;

import com.discord.SERVER.components.friendship.relationship.friendShipDemand.dto.FriendShipDemandResponseDTO;

import java.util.List;

public interface FriendShipDemandService {
    FriendShipDemandResponseDTO sendFriendShipRequest(Long requesterId, Long receiverId);
    FriendShipDemandResponseDTO acceptRequest(Long id);
    void ignoreRequest(Long id);
    List<FriendShipDemandResponseDTO> getFriendShipRequestsForIndividual(Long individualId);
}
