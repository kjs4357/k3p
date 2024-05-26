package com.group.k3p.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "redirect:/intro.html"; // 기본 경로로 접속 시 intro.html로 리다이렉트
    }
}
