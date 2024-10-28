package com.DevCollab.server.model;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CodeMessage {
    private String userId;
    private String code;

    private String language;




}
