package com.DevCollab.server.controller;


import com.DevCollab.server.model.CodeMessage;
import com.DevCollab.server.service.CodeMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*", exposedHeaders = "Authorization")
public class CodeEditorController {
    @Autowired
    private CodeMessageService codeMessageService;

    @MessageMapping("/editor/{username}")
    @SendTo("/topic/{username}")
    public CodeMessage updateCode(@DestinationVariable String username, CodeMessage codeMessage) {

        codeMessage.setUsername(username);
        CodeMessage updatedCodeMessage = codeMessageService.saveCode(codeMessage);


        return updatedCodeMessage;
    }
}
