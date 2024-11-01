package com.DevCollab.server.service;


import com.DevCollab.server.model.CodeMessage;
import com.DevCollab.server.repo.CodeMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CodeMessageService {
    @Autowired
    private CodeMessageRepository codeMessageRepository;

    public CodeMessage saveOrUpdateCode(String username, String code, String language) {
        // Find existing code message by username
        CodeMessage existingCodeMessage = codeMessageRepository.findTopByUsernameOrderByLastUpdatedDesc(username).orElse(null);

        if (existingCodeMessage != null) {
            // Update the existing message
            existingCodeMessage.setCode(code);
            existingCodeMessage.setLanguage(language);
            existingCodeMessage.setLastUpdated(LocalDateTime.now());
            return codeMessageRepository.save(existingCodeMessage); // Update existing document
        } else {
            // Create a new code message if it doesn't exist
            CodeMessage newCodeMessage = new CodeMessage();
            newCodeMessage.setUsername(username);
            newCodeMessage.setCode(code);
            newCodeMessage.setLanguage(language);
            newCodeMessage.setLastUpdated(LocalDateTime.now());
            return codeMessageRepository.save(newCodeMessage); // Create new document
        }
    }

    public CodeMessage getLatestCode(String username) {
        return codeMessageRepository.findTopByUsernameOrderByLastUpdatedDesc(username).orElse(null);
    }


}
