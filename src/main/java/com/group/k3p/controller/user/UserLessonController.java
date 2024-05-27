package com.group.k3p.controller.user;

import com.group.k3p.domain.LessonRequest;
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
    public Map<String, Boolean> completeLesson(@RequestBody LessonRequest request) {
        boolean completed = userLessonService.completeLesson(1L, request.getLessonId());
        Map<String, Boolean> response = new HashMap<>();
        response.put("completed", completed);
        return response;
    }

    @GetMapping("/checkLessonCompleted/{lessonId}")
    public Map<String, Boolean> checkLessonCompleted(@PathVariable Long lessonId) {
        boolean completed = userLessonService.isLessonCompleted(1L, lessonId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("completed", completed);
        return response;
    }
}