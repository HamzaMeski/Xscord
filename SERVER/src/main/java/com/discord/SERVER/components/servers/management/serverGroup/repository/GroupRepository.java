package com.discord.SERVER.components.servers.management.serverGroup.repository;

import com.discord.SERVER.entities.Group;
import com.discord.SERVER.entities.Server;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> findByServer(Server server);
}
