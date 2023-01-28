package ru.kata.spring.boot_security.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequiredArgsConstructor
public class AdminControllers {


    @GetMapping("/admin")
    public String getAdminAll() {
        return "admin";
    }
    @GetMapping("/user")
    public String getUser() {
        return "user";
    }
}
