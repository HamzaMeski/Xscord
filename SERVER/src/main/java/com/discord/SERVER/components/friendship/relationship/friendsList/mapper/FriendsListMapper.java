package com.discord.SERVER.components.friendship.relationship.friendsList.mapper;

import com.discord.SERVER.components.friendship.relationship.friendsList.dto.FriendsListResponseDTO;
import com.discord.SERVER.entities.FriendsList;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FriendsListMapper {
    FriendsListResponseDTO toResponse(FriendsList friendsList);
}
