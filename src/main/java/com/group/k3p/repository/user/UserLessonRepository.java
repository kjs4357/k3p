package com.group.k3p.repository.user;

import com.group.k3p.domain.Lectures.Lesson;
import com.group.k3p.domain.user.User;
import com.group.k3p.domain.user.UserLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserLessonRepository extends JpaRepository<UserLesson, Long> {
    UserLesson findByUserAndLesson(User user, Lesson lesson);
    List<UserLesson> findByUser(User user);
}
