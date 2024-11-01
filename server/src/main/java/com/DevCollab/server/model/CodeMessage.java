package com.DevCollab.server.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "codeMessages")
public class CodeMessage {
    @Id
    private String id;               // Unique identifier for the document
    private String username;         // Unique username to identify the user
    private String code;             // The current code snippet
    private String language;         // Programming language of the code
    private LocalDateTime lastUpdated; // Timestamp for the latest code update

    public CodeMessage(String id, String username, String code, String language, LocalDateTime lastUpdated) {
        this.id = id;
        this.username = username;
        this.code = code;
        this.language = language;
        this.lastUpdated = lastUpdated;
    }

    public CodeMessage() {
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}