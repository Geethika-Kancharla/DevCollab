package com.DevCollab.server.controller;

import com.DevCollab.server.model.CodeMessage;
import com.DevCollab.server.model.User;
import com.DevCollab.server.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

public class CodeController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public User getCode(@PathVariable String userId) {
        return userRepository.findById(userId).orElse(new User(userId, "", "", "", ""));
    }

    @MessageMapping("/code/update")
    @SendTo("/topic/code")
    public CodeMessage sendCodeUpdate(CodeMessage message) {
        User user = userRepository.findById(message.getUserId()).orElse(new User());
        user.setCode(message.getCode());
        userRepository.save(user);
        return message;
    }
}
