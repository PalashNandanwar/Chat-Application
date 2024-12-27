package com.example.chat.service;

import com.example.chat.model.User;
import com.example.chat.repository.UserR;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserS {
    @Autowired
    private UserR userR;
    @Autowired
    public UserS(UserR userR) {
        this.userR = userR;
    }
    public User registerUser(String username, String password, String email) {
        // Perform any necessary validation before saving
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setLastSeen(System.currentTimeMillis()); // Set the default lastSeen
        user.setOnline(false); // Set the user status as offline initially

        return userR.save(user); // Save the user to MongoDB
    }
//    public User registerUser(String username, String password, String email) {
//        // Check if user already exists
//        if (userR.findByUsername(username).isPresent()) {
//            throw new RuntimeException("User already exists");
//        }
//
//        // Create new user
//        User newUser = new User(username, password, email);
//        return userR.save(newUser);
//    }
    public User getUserById(String userId) {
        Optional<User> userOptional = userR.findById(userId);
        return userOptional.orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<User> getUserByUsername(String username) {
        return userR.findByUsername(username);
    }

    public User saveUser(User user) {
        return userR.save(user);
    }

    public void updateUserStatus(String userId, boolean isOnline) {
        User user = userR.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setOnline(isOnline);
        user.setLastSeen(System.currentTimeMillis());
        userR.save(user);
    }


}
