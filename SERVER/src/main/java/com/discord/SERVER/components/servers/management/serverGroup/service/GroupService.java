package com.discord.SERVER.components.servers.management.serverGroup.service;

import com.discord.SERVER.components.servers.management.serverGroup.dto.GroupRequestDTO;
import com.discord.SERVER.components.servers.management.serverGroup.dto.GroupResponseDTO;

import java.util.List;

public interface GroupService {
    GroupResponseDTO createGroup(GroupRequestDTO groupRequestDTO);
    GroupResponseDTO getGroup(Long groupId);
    List<GroupResponseDTO> getServerGroups(Long serverId);
    void deleteGroup(Long groupId);
}
