package com.example.chat.repository;

import com.example.chat.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageR extends MongoRepository<Message, String> {
    List<Message> findByReceiverId(String receiverID);
    List<Message> findByGroupId(String groupId);
    List<Message> findBySenderIdOrReceiverId(String senderId, String receiverId);

}
