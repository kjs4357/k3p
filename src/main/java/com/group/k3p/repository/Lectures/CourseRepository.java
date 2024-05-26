package com.group.k3p.repository.Lectures;

import com.group.k3p.domain.Lectures.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
