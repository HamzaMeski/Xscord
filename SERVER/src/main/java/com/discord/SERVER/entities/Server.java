package com.discord.SERVER.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Table(name = "servers")
@Entity
public class Server {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy = "server", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Group> groups;
}
