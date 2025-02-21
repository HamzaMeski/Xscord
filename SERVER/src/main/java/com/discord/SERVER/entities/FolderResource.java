package com.discord.SERVER.entities;

import com.discord.SERVER.enums.FolderMediaType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@Table(name = "media_files")
public class FolderResource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne()
    @JoinColumn(name = "fodler_id")
    private Folder folder;

    @ManyToOne()
    @JoinColumn(name = "uploader_id")
    private Individual uploader;

    private Long size;
    private String name;
    private String description;
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private FolderMediaType mediaType;

    @PrePersist
    private void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
