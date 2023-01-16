package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminControllers {

    private final UserService userService;
    private final RoleService roleService;

    public AdminControllers(UserServiceImpl userServiceImpl, RoleService roleService) {
        this.userService = userServiceImpl;
        this.roleService = roleService;
    }

    //work----
    @GetMapping("")
    public String getAllUsers(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User admin = userService.findByUsername(username);
        model.addAttribute("admin", admin);
        model.addAttribute("users", userService.findAllUsers());
        model.addAttribute("roles", roleService.getRoles());
        model.addAttribute("newUser", new User());
        return "all";
    }

    //work---
    @GetMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        userService.deleteByIdUsers(id);
        return "redirect:/admin";
    }

    //work----
    @PostMapping("/new")
    public String newUser(@ModelAttribute("user") User user,
                          @RequestParam(value = "nameRole", required = false)
                          List<String> nameRole) {
        user.setRoles(roleService.getRoleName(nameRole));
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PatchMapping("/edit/{id}")
    public String updateUser(@ModelAttribute("user") User user,@RequestParam(value = "name",required = false)
    List<String> name, @PathVariable("id") int id) {
        user.setRoles(roleService.getRoleName(name));
        userService.updateUser(id, user);
        return "redirect:/admin";
    }
}