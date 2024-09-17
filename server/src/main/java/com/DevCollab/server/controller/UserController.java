package com.DevCollab.server.controller;

import com.DevCollab.server.model.User;
import com.DevCollab.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;



    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping("/home")
    public String home() {
        return "Welcome to the Home Page!";
    }


    @PostMapping("/login")
    public String login(@RequestBody User user) {
     return userService.verify(user);
    }

}


