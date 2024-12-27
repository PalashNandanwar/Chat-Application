package com.example.chat.repository;

import com.example.chat.model.Group;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupR extends MongoRepository<Group, String> {
    Optional<Group> findById(String groupName);
}
