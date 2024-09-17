package com.DevCollab.server.service;

import com.DevCollab.server.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {


    String registerUser(User user);

    String verify(User user);
}
