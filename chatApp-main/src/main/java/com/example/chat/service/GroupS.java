package com.example.chat.service;

import com.example.chat.model.Group;
import com.example.chat.repository.GroupR;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GroupS {
    @Autowired
    private GroupR groupR;
    public Group getGroupById(String groupId) {
        Optional<Group> groupOptional = groupR.findById(groupId);
        return groupOptional.orElseThrow(() -> new RuntimeException("Group not found"));
    }

    public Group createGroup(Group group) {
        return groupR.save(group);
    }

}
