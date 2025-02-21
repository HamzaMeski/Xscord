package com.discord.SERVER.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@NoArgsConstructor
@Setter
@Getter
@Table(name = "individuals")
public class Individual extends User {
    private String displayName;
}
