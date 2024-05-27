package com.group.k3p.service.user;

import com.group.k3p.domain.Lectures.Lesson;
import com.group.k3p.domain.user.User;
import com.group.k3p.domain.user.UserLesson;
import com.group.k3p.repository.Lectures.LessonRepository;
import com.group.k3p.repository.user.UserLessonRepository;
import com.group.k3p.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserLessonService {

    @Autowired
    private UserLessonRepository userLessonRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LessonRepository lessonRepository;

    public boolean completeLesson(Long userId, Long lessonId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new IllegalArgumentException("Invalid lesson ID: " + lessonId));

        UserLesson userLesson = userLessonRepository.findByUserAndLesson(user, lesson);
        if (userLesson == null) {
            userLesson = new UserLesson(user, lesson, true);
            userLessonRepository.save(userLesson);
            return true;
        }
        return false;
    }

    public boolean isLessonCompleted(Long userId, Long lessonId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new IllegalArgumentException("Invalid lesson ID: " + lessonId));

        UserLesson userLesson = userLessonRepository.findByUserAndLesson(user, lesson);
        return userLesson != null && userLesson.isCompleted();
    }

    public List<Long> getCompletedLessons(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));
        List<UserLesson> userLessons = userLessonRepository.findByUser(user);
        return userLessons.stream()
                .filter(UserLesson::isCompleted)
                .map(userLesson -> userLesson.getLesson().getId())
                .collect(Collectors.toList());
    }
}