package com.DevCollab.server.model;

public class CodeMessage {
    private String userId;
    private String code;

    public CodeMessage() {}

    public CodeMessage(String userId, String code) {
        this.userId = userId;
        this.code = code;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
