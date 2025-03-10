package com.discord.SERVER.components.servers.management.serverGroup.service;

import com.discord.SERVER.components.servers.management.serverGroup.dto.CreateGroupRequestDTO;
import com.discord.SERVER.components.servers.management.serverGroup.dto.GroupResponseDTO;
import com.discord.SERVER.components.servers.management.serverGroup.dto.UpdateGroupRequestDTO;

import java.util.List;

public interface GroupService {
    GroupResponseDTO createGroup(CreateGroupRequestDTO groupRequestDTO);
    GroupResponseDTO getGroup(Long groupId);
    List<GroupResponseDTO> getServerGroups(Long serverId);
    GroupResponseDTO updateGroup(UpdateGroupRequestDTO requestDTO, Long groupId);
    void deleteGroup(Long groupId);
}
