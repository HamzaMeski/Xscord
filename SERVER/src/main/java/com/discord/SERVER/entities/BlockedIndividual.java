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
@Table(name = "blocked_individuals")
public class BlockedIndividual {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "blocker_id")
    private Individual blocker;

    @ManyToOne()
    @JoinColumn(name = "blocked_individual_id")
    private Individual blockedIndividual;

    private boolean isBlocked;
    private LocalDateTime createdAt;

    @PrePersist
    private void onCreate() {
        createdAt  = LocalDateTime.now();
    }
}
