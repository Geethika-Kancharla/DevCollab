package com.DevCollab.server.service;

import com.DevCollab.server.model.LoginRequest;
import com.DevCollab.server.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {


    String registerUser(User user);

    String verify(LoginRequest loginRequest);

    User getUserById(String userId);

    User updateCode(String userId, String newCode);
}
