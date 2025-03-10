package com.discord.SERVER.components.servers.management.server.repository;

import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.entities.Server;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServerRepository extends JpaRepository<Server, Long> {
    List<Server> findByIndividual(Individual owner);

    @Query("""
        SELECT COUNT(s) > 0
        FROM Server s
        WHERE(s = :server AND s.individual = :individual)
   """)
    boolean doesIndividualHaveServer(Individual individual, Server server);
}
