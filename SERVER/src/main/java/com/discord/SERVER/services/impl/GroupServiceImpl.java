package com.discord.SERVER.services.impl;

import com.discord.SERVER.entities.Group;
import com.discord.SERVER.entities.Server;
import com.discord.SERVER.repositories.GroupRepository;
import com.discord.SERVER.repositories.ServerRepository;
import com.discord.SERVER.services.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final ServerRepository serverRepository;


    @Override
    public void createGroup() {
        Group group = new Group();
        Server server = serverRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("server with that ID doesn't found"));
        group.setServer(server);
        group.setName("Greatest Squad");
        groupRepository.save(group);
    }
}
