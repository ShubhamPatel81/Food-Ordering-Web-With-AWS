package com.foodOrdering.service.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodOrdering.Request.FoodRequest;
import com.foodOrdering.Request.FoodResponse;
import com.foodOrdering.service.FoodService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@AllArgsConstructor
public class FoodController {

private final FoodService foodService;
    @PostMapping
    public FoodResponse addFood(@RequestPart("food")String foodString,
                                          @RequestPart("file")MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest request =null;
        try {
            request=   objectMapper.readValue(foodString,FoodRequest.class);
        }catch (JsonProcessingException e){
             throw  new ResponseStatusException(HttpStatus.BAD_REQUEST,"Invalid JSON FORMAT -> foodController(01) ");
        }
      FoodResponse response= foodService.addFood(request, file);
        return response;
    }
    @GetMapping
    public List<FoodResponse> readFoods(){
       return foodService.readFoods();
    }

    @GetMapping("/{id}")
    public FoodResponse readFoodById(@PathVariable String id){
       return foodService.readFoodById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public  void  deleteFoodById(@PathVariable String id){
        foodService.deleteFood(id);
    }
}
