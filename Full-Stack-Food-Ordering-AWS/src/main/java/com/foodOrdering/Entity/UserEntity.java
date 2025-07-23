package com.foodOrdering.Entity;
// this entity is used for the user login and register purpose

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data@AllArgsConstructor@NoArgsConstructor
@Builder
@Document(collection = "users")
public class UserEntity {
    @Id
    private String id;
    private String name;
    private  String  email;
    private String password;
}
