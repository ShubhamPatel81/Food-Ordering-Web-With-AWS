package com.foodOrdering.Request;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class OrderItem {

    private String foodId;
    private int quantity;
    private  double price;
    private String category;
    private String imageUrl;
    private String description;
    private String name;
}
