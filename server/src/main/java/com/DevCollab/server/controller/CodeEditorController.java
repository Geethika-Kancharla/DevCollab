package com.DevCollab.server.controller;

import com.DevCollab.server.model.CodeMessage;
import com.DevCollab.server.service.CodeMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*", exposedHeaders = "Authorization")
public class CodeEditorController {
    @Autowired
    private CodeMessageService codeMessageService;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/getLatestCode/{roomId}")
    @SendTo("/topic/{roomId}")
    public CodeMessage getLatestCode(@DestinationVariable String roomId) {
        return codeMessageService.getLatestCode(roomId);
    }

    @MessageMapping("/editor/{roomId}")
    @SendTo("/topic/{roomId}")
    public CodeMessage handleCodeUpdate(@DestinationVariable String roomId, CodeMessage updatedCodeMessage) {
        codeMessageService.saveOrUpdateCode(roomId, updatedCodeMessage.getCode(), updatedCodeMessage.getLanguage());
        return updatedCodeMessage;
    }
}
