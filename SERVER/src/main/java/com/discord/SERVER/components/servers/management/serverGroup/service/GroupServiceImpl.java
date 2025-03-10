package com.discord.SERVER.components.servers.management.serverGroup.service;

import com.discord.SERVER.components.servers.management.server.repository.ServerRepository;
import com.discord.SERVER.components.servers.management.serverGroup.dto.CreateGroupRequestDTO;
import com.discord.SERVER.components.servers.management.serverGroup.dto.GroupResponseDTO;
import com.discord.SERVER.components.servers.management.serverGroup.dto.UpdateGroupRequestDTO;
import com.discord.SERVER.components.servers.management.serverGroup.mapper.GroupMapper;
import com.discord.SERVER.components.servers.management.serverGroup.repository.GroupRepository;
import com.discord.SERVER.entities.Group;
import com.discord.SERVER.entities.Server;
import com.discord.SERVER.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final GroupMapper groupMapper;
    private final ServerRepository serverRepository;

    @Override
    public GroupResponseDTO createGroup(CreateGroupRequestDTO groupRequestDTO) {
        Server server = serverRepository.findById(groupRequestDTO.serverId()).orElseThrow();
        Group group = groupMapper.toEntity(groupRequestDTO);
        group.setServer(server);

        return groupMapper.toResponse(groupRepository.save(group));
    }

    @Override
    public GroupResponseDTO getGroup(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("group doesn't exist with id: "+groupId));

        return groupMapper.toResponse(group);
    }

    @Override
    public List<GroupResponseDTO> getServerGroups(Long serverId) {
        Server server = serverRepository.findById(serverId)
                .orElseThrow(() -> new ResourceNotFoundException("server doesn't exist with id: "+serverId));

        return groupRepository.findByServer(server).stream()
                .map(groupMapper::toResponse)
                .toList();
    }

    @Override
    public GroupResponseDTO updateGroup(UpdateGroupRequestDTO requestDTO, Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("group doesn't exist with id: "+groupId));

        if(requestDTO.name() != null) {
            group.setName(requestDTO.name());
        }

        if(requestDTO.description() != null) {
            group.setDescription(requestDTO.description());
        }

        return groupMapper.toResponse(groupRepository.save(group));
    }

    @Override
    public void deleteGroup(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("group doesn't exist with id: "+groupId));

        groupRepository.delete(group);
    }
}
