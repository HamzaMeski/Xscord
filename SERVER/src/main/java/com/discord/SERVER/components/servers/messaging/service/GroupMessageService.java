package com.discord.SERVER.components.servers.messaging.service;

import com.discord.SERVER.components.servers.messaging.dto.GroupMessageRequestDTO;
import com.discord.SERVER.components.servers.messaging.dto.GroupMessageResponseDTO;

import java.util.List;

public interface GroupMessageService {
    GroupMessageResponseDTO sendMessage(Long senderId, GroupMessageRequestDTO requestDTO);
    List<GroupMessageResponseDTO> getGroupMessages(Long groupId);
}
