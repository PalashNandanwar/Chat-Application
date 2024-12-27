package com.example.chat.service;

import com.example.chat.model.Message;
import com.example.chat.repository.MessageR;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageS {
    @Autowired
    private MessageR messageR;
    public List<Message> getMessages(String receiverId, String groupId) {
        if (groupId != null) {
            return messageR.findByGroupId(groupId);
        } else {
            return messageR.findByReceiverId(receiverId);
        }
    }
    public Message saveMessage(Message message){
        return messageR.save(message);
    }

}
