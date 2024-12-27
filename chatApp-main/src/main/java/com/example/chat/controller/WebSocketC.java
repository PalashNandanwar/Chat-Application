package com.example.chat.controller;

import com.example.chat.model.Message;
import com.example.chat.model.TypingIndicator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequiredArgsConstructor
public class WebSocketC {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;



//    @MessageMapping("/send")
//    @SendTo("/topic/messages")
//    public Message sendMessage(Message message) {
//        return message;
//    }
    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public Message sendMessage(@Payload Message message) {
        return message; // Real-time broadcast
    }
    @MessageMapping("/typing")  // Endpoint for receiving typing events
    public void handleTypingIndicator(@Payload TypingIndicator typingIndicator) {
        if (typingIndicator.getGroupId() != null) {
            // Notify all group members about typing status
            messagingTemplate.convertAndSend(
                    "/topic/group/" + typingIndicator.getGroupId(),
                    typingIndicator
            );
        } else if (typingIndicator.getReceiverId() != null) {
            // Notify specific user in one-to-one chat
            messagingTemplate.convertAndSend(
                    "/topic/user/" + typingIndicator.getReceiverId(),
                    typingIndicator
            );
        }
    }

}
