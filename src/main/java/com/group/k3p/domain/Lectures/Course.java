package com.group.k3p.domain.Lectures;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String level; // 초급, 중급, 고급

    @OneToMany(mappedBy = "course")
    private List<Lesson> lessons;

    // Getter, Setter 및 기타 메서드 생략
}
