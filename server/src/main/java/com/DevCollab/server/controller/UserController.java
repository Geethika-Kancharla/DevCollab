package com.DevCollab.server.controller;

import com.DevCollab.server.model.LoginRequest;
import com.DevCollab.server.model.User;
import com.DevCollab.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*", exposedHeaders = "Authorization")
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
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
     return userService.verify(loginRequest);
    }

}


