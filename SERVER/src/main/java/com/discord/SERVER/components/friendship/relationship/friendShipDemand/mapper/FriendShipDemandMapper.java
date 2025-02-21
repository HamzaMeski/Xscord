package com.discord.SERVER.components.friendship.relationship.friendShipDemand.mapper;

import com.discord.SERVER.components.friendship.relationship.friendShipDemand.dto.FriendShipDemandResponseDTO;
import com.discord.SERVER.entities.FriendShipDemand;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FriendShipDemandMapper {
    FriendShipDemandResponseDTO toResponse(FriendShipDemand friendShipDemand);
}
