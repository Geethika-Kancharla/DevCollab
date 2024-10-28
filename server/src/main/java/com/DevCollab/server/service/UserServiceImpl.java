package com.DevCollab.server.service;

import com.DevCollab.server.model.LoginRequest;
import com.DevCollab.server.model.User;
import com.DevCollab.server.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    @Override
    public String registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists!";
        }

        // Encrypt the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");

        // Save the user to MongoDB
        userRepository.save(user);
        return "User registered successfully!";
    }

    @Override
    public String verify(LoginRequest loginRequest) {

        Authentication authentication=authManager.
                authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));

        if(authentication.isAuthenticated())
            return jwtService.generateToken(loginRequest.getUsername());

        return "failure";
    }

    @Override
    public User getUserById(String userId) {
        return null;
    }

    @Override
    public User updateCode(String userId, String newCode,String newlanguage) {
        User user = getUserById(userId);
        if (user != null) {
            user.setCode(newCode);
            user.setLanguage(newlanguage);
            return userRepository.save(user);
        }
        return null;
    }


}
