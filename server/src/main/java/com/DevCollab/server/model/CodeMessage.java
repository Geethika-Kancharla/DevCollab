package com.DevCollab.server.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "codeMessages")
public class CodeMessage {
    @Id
    private String id;               // Unique identifier for the document
    private String username;
    private String code;
    private String language;

}
