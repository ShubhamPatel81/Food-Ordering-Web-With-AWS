package com.foodOrdering.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartRequest {
//    private String userId;
    private String foodId;
//    private Map<String , Integer> items = new HashMap<>();
}
