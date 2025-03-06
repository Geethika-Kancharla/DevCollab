package com.DevCollab.server.service;


import com.DevCollab.server.model.CodeMessage;
import com.DevCollab.server.repo.CodeMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CodeMessageService {
    @Autowired
    private CodeMessageRepository codeMessageRepository;

    public CodeMessage saveOrUpdateCode(String username, String code, String language) {
     
        CodeMessage existingCodeMessage = codeMessageRepository.findTopByUsernameOrderByLastUpdatedDesc(username).orElse(null);

        if (existingCodeMessage != null) {
            
            existingCodeMessage.setCode(code);
            existingCodeMessage.setLanguage(language);
            existingCodeMessage.setLastUpdated(LocalDateTime.now());
            return codeMessageRepository.save(existingCodeMessage);
        } else {
          
            CodeMessage newCodeMessage = new CodeMessage();
            newCodeMessage.setUsername(username);
            newCodeMessage.setCode(code);
            newCodeMessage.setLanguage(language);
            newCodeMessage.setLastUpdated(LocalDateTime.now());
            return codeMessageRepository.save(newCodeMessage); 
        }
    }

    public CodeMessage getLatestCode(String username) {
        return codeMessageRepository.findTopByUsernameOrderByLastUpdatedDesc(username).orElse(null);
    }


}