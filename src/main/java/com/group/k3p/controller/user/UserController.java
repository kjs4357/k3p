package com.group.k3p.controller.user;

import com.group.k3p.domain.user.User;
import com.group.k3p.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public String signup(@ModelAttribute User user, @RequestParam("confirmPassword") String confirmPassword, Model model) {
        String userID = user.getUserID();
        String userIDRegex = "^[a-zA-Z0-9]+$";

        if (!user.getUserPassword().equals(confirmPassword)) {
            model.addAttribute("error", "Passwords do not match.");
            return "intro"; // 회원가입 페이지로 돌아감
        }

        if (!userID.matches(userIDRegex)) {
            model.addAttribute("error", "UserID must not contain special characters.");
            return "intro"; // 회원가입 페이지로 돌아감
        }

        if (!userService.isUserIDAvailable(user.getUserID())) {
            model.addAttribute("message", "User ID is already taken.");
            return "intro";
        }

        if (!userService.isUserEmailAvailable(user.getUserEmail())) {
            model.addAttribute("message", "Email is already taken.");
            return "intro";
        }

        userService.registerUser(user);
        return "intro";
    }

    @PostMapping("/checkUserID")
    @ResponseBody
    public boolean checkUserID(@RequestParam String userID) {
        boolean isAvailable = userService.isUserIDAvailable(userID);
        return isAvailable;
    }
    @PostMapping("/checkUserEmail")
    @ResponseBody
    public boolean checkUserEmail(@RequestParam String userEmail) {
        return userService.isUserEmailAvailable(userEmail);
    }
    @PostMapping("/login")
    public String login(@RequestParam String userID,
                        @RequestParam String userPassword,
                        Model model) {
        if (userService.authenticate(userID, userPassword)) {
            return "redirect:/main"; // 로그인 성공 시 리디렉션
        } else {
            model.addAttribute("error", "아이디 혹은 비밀번호가 틀렸습니다.");
            return "intro";
        }
    }

}
