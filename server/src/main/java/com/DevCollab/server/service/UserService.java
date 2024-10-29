package com.DevCollab.server.service;

import com.DevCollab.server.model.LoginRequest;
import com.DevCollab.server.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {


    String registerUser(User user);

    ResponseEntity<?> verify(LoginRequest loginRequest);

    String getId();


}
