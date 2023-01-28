package ru.kata.spring.boot_security.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;


import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RestControllers {
    private final UserService userService;


    @GetMapping("/user")
    public ResponseEntity<User> getOneUser(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    //work----
    @GetMapping("/admin")
    public ResponseEntity<List<User>> getAllUser() {
        return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
    }

    //work---
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<List<User>> deleteUser(@PathVariable Long id) {
        userService.deleteByIdUsers(id);
        return new ResponseEntity<>(userService.findAllUsers(),HttpStatus.OK);
    }

    //work----
    @RequestMapping(value = "/admin",method = {RequestMethod.PUT, RequestMethod.POST})
    public ResponseEntity<User> newUserAndUpdate(@RequestBody User user) {
        userService.updateAndSaveUser(user);
        return new ResponseEntity<>(user ,HttpStatus.OK);
    }


}
