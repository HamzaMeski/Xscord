package com.discord.SERVER.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name = "groups")
@Entity
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @ManyToOne()
    @JoinColumn(name = "server_id")
    private Server server;
}