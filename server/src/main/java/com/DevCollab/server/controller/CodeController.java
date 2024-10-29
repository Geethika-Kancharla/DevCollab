package com.DevCollab.server.controller;

import com.DevCollab.server.model.CodeMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CodeController {

    @MessageMapping("/code.update")
    @SendTo("/topic/code")
    public CodeMessage sendCodeUpdate(CodeMessage message) {
        return message;
    }
}
