package com.group.k3p.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class QuizController {
    @GetMapping("/test_1")
    public String redirectToQuiz1() {
        return "quiz";
    }
    @GetMapping("/test_2")
    public String redirectToQuiz2() {
        return "quiz";
    }
    @GetMapping("/test_3")
    public String redirectToQuiz3() {
        return "quiz";
    }
    @GetMapping("/test_4")
    public String redirectToQuiz4() {
        return "quiz";
    }
    @GetMapping("/test_5")
    public String redirectToQuiz5() {
        return "quiz";
    }
    @GetMapping("/backToMain")
    public String backToMain() {
        return "main";
    }
}
