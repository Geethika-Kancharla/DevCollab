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

    @MessageMapping("/getLatestCode/{username}")
    @SendTo("/topic/{username}")
    public CodeMessage getLatestCode(@DestinationVariable String username) {
        // Return the latest code for the user
        return codeMessageService.getLatestCode(username);
    }

    @MessageMapping("/editor/{username}")
    public void handleCodeUpdate(@DestinationVariable String username, CodeMessage updatedCodeMessage) {
        // Update the user's code in the database
        codeMessageService.saveOrUpdateCode(username, updatedCodeMessage.getCode(), updatedCodeMessage.getLanguage());
    }
}
