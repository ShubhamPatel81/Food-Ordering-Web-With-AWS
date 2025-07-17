package com.foodOrdering.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "foods")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodEntity {
    @Id
    private String id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private String imageUrl;

}
