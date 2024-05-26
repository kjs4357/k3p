package com.group.k3p.service.user;

import com.group.k3p.domain.Lectures.Lesson;
import com.group.k3p.domain.user.User;
import com.group.k3p.domain.user.UserLesson;
import com.group.k3p.repository.Lectures.LessonRepository;
import com.group.k3p.repository.user.UserLessonRepository;
import com.group.k3p.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserLessonService {

    @Autowired
    private UserLessonRepository userLessonRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LessonRepository lessonRepository;

    public UserLesson completeLesson(Long userId, Long lessonId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new IllegalArgumentException("Invalid lesson ID: " + lessonId));

        UserLesson userLesson = userLessonRepository.findByUserIdAndLessonId(userId, lessonId);
        if (userLesson == null) {
            userLesson = new UserLesson();
            userLesson.setUser(user);
            userLesson.setLesson(lesson);
            userLesson.setCompleted(true);
            userLessonRepository.save(userLesson);
        }
        return userLesson;
    }
}