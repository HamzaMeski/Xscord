package com.discord.SERVER.components.servers.management.serverJoinDemand.repository;

import com.discord.SERVER.entities.Individual;
import com.discord.SERVER.entities.Server;
import com.discord.SERVER.entities.ServerJoinDemand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ServerJoinDemandRepository extends JpaRepository<ServerJoinDemand, Long> {

    @Query("""
        SELECT COUNT(sjd) > 0
        FROM ServerJoinDemand sjd
        WHERE
        (sjd.server = :server AND sjd.receiver = :receiver AND sjd.accepted = false)
    """)
    boolean existsWithFalseAcceptation(Server server, Individual receiver);

    @Query("""
        SELECT COUNT(sjd) > 0
        FROM ServerJoinDemand sjd
        WHERE
        (sjd.server = :server AND sjd.receiver = :receiver AND sjd.accepted = true)
    """)
    boolean existsWithTrueAcceptation(Server server, Individual receiver);

    ServerJoinDemand findByServerAndReceiver(Server server, Individual receiver);
}
