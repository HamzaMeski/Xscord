package com.discord.SERVER.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@Table(name = "servers")
public class Server {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne()
    @JoinColumn(name = "individual_id")
    private Individual individual;

    @OneToMany(mappedBy = "server", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Group> groups;

    private String name;
    private String description;
    private LocalDateTime createAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createAt  = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
