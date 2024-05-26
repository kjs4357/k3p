package com.group.k3p.controller.user;

import com.group.k3p.controller.LessonRequest;
import com.group.k3p.domain.user.UserLesson;
import com.group.k3p.service.user.UserLessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserLessonController {

    @Autowired
    private UserLessonService userLessonService;

    @PostMapping("/completeLesson")
    public UserLesson completeLesson(@RequestParam Long userId, @RequestParam Long lessonId) {
        return userLessonService.completeLesson(userId, lessonId);
    }
}