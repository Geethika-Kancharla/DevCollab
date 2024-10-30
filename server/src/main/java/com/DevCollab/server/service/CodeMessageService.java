package com.DevCollab.server.service;


import com.DevCollab.server.model.CodeMessage;
import com.DevCollab.server.repo.CodeMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CodeMessageService {
    @Autowired
    private CodeMessageRepository codeMessageRepository;

    public CodeMessage saveCode(CodeMessage codeMessage) {
        Optional<CodeMessage> existingCode = codeMessageRepository.findByUserName(codeMessage.getUsername());
        if (existingCode.isPresent()) {
            CodeMessage codeToUpdate = existingCode.get();
            codeToUpdate.setCode(codeMessage.getCode());
            codeToUpdate.setLanguage(codeMessage.getLanguage());
            return codeMessageRepository.save(codeToUpdate);
        } else {
            return codeMessageRepository.save(codeMessage);
        }
    }

    public Optional<CodeMessage> getCodeByUserName(String username) {
        return codeMessageRepository.findByUserName(username);
    }

}
