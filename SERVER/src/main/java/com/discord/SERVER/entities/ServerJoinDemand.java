package com.discord.SERVER.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@Table(name = "servers_join_demands")
public class ServerJoinDemand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "server_id")
    private Server server;

    @ManyToOne()
    @JoinColumn(name = "receiver_id")
    private Individual receiver;

    @Builder.Default
    @Column(name = "is_invitation_link")
    private boolean isInvitationLink = false;

    @Builder.Default
    private boolean accepted = false;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    private void onCreate() {
        createdAt  = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    private void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
