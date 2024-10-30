package com.DevCollab.server.repo;

import com.DevCollab.server.model.CodeMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CodeMessageRepository extends MongoRepository<CodeMessage,String> {
    Optional<CodeMessage> findByUserName(String username);
}
