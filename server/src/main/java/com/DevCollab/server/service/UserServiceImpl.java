package com.DevCollab.server.service;

import com.DevCollab.server.model.JWTResponse;
import com.DevCollab.server.model.LoginRequest;
import com.DevCollab.server.model.User;
import com.DevCollab.server.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");


        userRepository.save(user);
        return "User registered successfully!";
    }

    @Override
    public ResponseEntity<?> verify(LoginRequest loginRequest) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(loginRequest.getUsername());
            return ResponseEntity.ok(new JWTResponse(token)); 
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password"); 
    }

    @Override
    public String getId() {

        return null;
    }




}
