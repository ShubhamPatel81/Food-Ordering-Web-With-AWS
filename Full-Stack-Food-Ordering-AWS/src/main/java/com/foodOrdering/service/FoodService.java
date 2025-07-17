package com.foodOrdering.service;

import com.foodOrdering.Request.FoodRequest;
import com.foodOrdering.Request.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {
   String uploadFile(MultipartFile file);

  FoodResponse addFood(FoodRequest request, MultipartFile file);

   List<FoodResponse> readFoods();

   FoodResponse readFoodById(String id);

   public boolean deletefile(String fileName);

   public  void  deleteFood(String id);

}
