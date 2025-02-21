package com.discord.SERVER.entities;

import com.discord.SERVER.enums.MessageMediaType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@Table(name = "message_resources")
public class MessageResource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne()
    @JoinColumn(name = "peer_message_id", referencedColumnName = "id")
    private PeerMessage peerMessage;

    @OneToOne()
    @JoinColumn(name = "group_message_id", referencedColumnName = "id")
    private GroupMessage groupMessage;

    private String path;
    private String contentType;
    private Long size;

    @Enumerated(EnumType.STRING)
    private MessageMediaType mediaType;

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
