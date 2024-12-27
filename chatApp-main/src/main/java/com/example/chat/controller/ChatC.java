package com.example.chat.controller;

import com.example.chat.model.Group;
import com.example.chat.model.Message;
import com.example.chat.model.User;
import com.example.chat.repository.MessageR;
import com.example.chat.repository.UserR;
import com.example.chat.service.GroupS;
import com.example.chat.service.MessageS;
import com.example.chat.service.UserS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/chat")
public class ChatC {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private UserS userS;

    @Autowired
    private MessageS messageS;

    @Autowired
    private GroupS groupS;
    @Autowired
    private MessageR messageR;
    @Autowired
    private UserR userR;
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        // Ensure the input is valid
        if (user.getUsername() == null || user.getPassword() == null || user.getEmail() == null) {
            return ResponseEntity.badRequest().build(); // Return 400 if any field is missing
        }

        User savedUser = userS.registerUser(user.getUsername(), user.getPassword(), user.getEmail());

        if (savedUser == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500 if saving fails
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser); // Return 201 if successful
    }

    @GetMapping("/chat/history/{userId}")
    public List<Message> getChatHistory(@PathVariable String userId) {
        return messageR.findBySenderIdOrReceiverId(userId, userId);
    }



    @PutMapping("/user/status/{userId}")
    public ResponseEntity<String> updateUserStatus(@PathVariable String userId, @RequestBody Map<String, Object> status) {
        Optional<User> userOptional = userR.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (status.containsKey("isOnline")) {
                user.setOnline((Boolean) status.get("isOnline"));
            }
            // Automatically set lastSeen if the user is offline
            if (status.containsKey("isOnline") && !(Boolean) status.get("isOnline")) {
                user.setLastSeen(System.currentTimeMillis());
            } else if (status.containsKey("lastSeen")) {
                user.setLastSeen((Long) status.get("lastSeen")); // If passed explicitly
            }
            userR.save(user);
            return ResponseEntity.ok("User status updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }


    @PostMapping("/createGroup")
    public Group createGroup(@RequestBody Group group) {
        return groupS.createGroup(group);
    }
//    @PostMapping("/sendMessage")
//    public Message sendMessage(@RequestBody Message message) {
//        return messageS.saveMessage(message);
//    }
    @PostMapping("/sendMessage")
    public Message sendMessage(@RequestBody Message message) {
        Message savedMessage = messageS.saveMessage(message);

        messagingTemplate.convertAndSend("/topic/messages", savedMessage);
        return savedMessage;
    }


}
