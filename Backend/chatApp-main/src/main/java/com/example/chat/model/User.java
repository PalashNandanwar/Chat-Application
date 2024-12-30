package com.example.chat.model;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "Users")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private boolean isOnline;
    private long lastSeen;

    public User() {
    }
    public User(String username, String password, String email, boolean isOnline, long lastSeen) {
        this.username = username;
        this.password=password;
        this.email=email;
        this.isOnline = isOnline;
        this.lastSeen = lastSeen;
    }
    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.isOnline = false;
        this.lastSeen = System.currentTimeMillis();
    }




    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isOnline() {
        return isOnline;
    }

    public void setOnline(boolean online) {
        isOnline = online;
    }

    public long getLastSeen() {
        return lastSeen;
    }

    public void setLastSeen(long lastSeen) {
        this.lastSeen = lastSeen;
    }
}


