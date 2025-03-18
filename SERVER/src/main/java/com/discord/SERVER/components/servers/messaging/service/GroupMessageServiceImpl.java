package com.discord.SERVER.components.servers.messaging.service;

import com.discord.SERVER.components.individual.repository.IndividualRepository;
import com.discord.SERVER.components.servers.management.serverGroup.repository.GroupRepository;
import com.discord.SERVER.components.servers.messaging.dto.GroupMessageRequestDTO;
import com.discord.SERVER.components.servers.messaging.dto.GroupMessageResponseDTO;
import com.discord.SERVER.components.servers.messaging.mapper.GroupMessageMapper;
import com.discord.SERVER.components.servers.messaging.repository.GroupMessageRepository;
import com.discord.SERVER.entities.Group;
import com.discord.SERVER.entities.GroupMessage;
import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupMessageServiceImpl implements GroupMessageService {

    private final IndividualRepository individualRepository;
    private final GroupMessageRepository groupMessageRepository;
    private final GroupRepository groupRepository;
    private final GroupMessageMapper groupMessageMapper;

    @Override
    public GroupMessageResponseDTO sendMessage(Long senderId, GroupMessageRequestDTO requestDTO) {
        Individual sender = individualRepository.findById(senderId)
                .orElseThrow();

        Group group =groupRepository.findById(requestDTO.groupId())
                .orElseThrow(() -> new ResourceNotFoundException("group not found with id "+requestDTO.groupId()));


        GroupMessage groupMessage = GroupMessage.builder()
                .sender(sender)
                .group(group)
                .content(requestDTO.content())
                .build();

        return groupMessageMapper.toResponse(groupMessageRepository.save(groupMessage));
    }

    @Override
    public List<GroupMessageResponseDTO> getGroupMessages(Long groupId) {
        Group group =groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("group not found with id "+groupId));

        return groupMessageRepository.getGroupMessages(group).stream()
                .map(groupMessageMapper::toResponse)
                .toList();
    }
}
