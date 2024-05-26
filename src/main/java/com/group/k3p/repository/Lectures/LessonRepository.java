package com.group.k3p.repository.Lectures;

import com.group.k3p.domain.Lectures.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
}
