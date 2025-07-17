package com.foodOrdering.service.impl;

import com.foodOrdering.Entity.FoodEntity;
import com.foodOrdering.Repository.FoodRepository;
import com.foodOrdering.Request.FoodRequest;
import com.foodOrdering.Request.FoodResponse;
import com.foodOrdering.service.FoodService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service

public class FoodServiceImpl implements FoodService {
    @Autowired
    private  S3Client s3Client;
    @Value("${aws.s3.bucket}")
    private String bucketName;
    @Autowired
    private  FoodRepository foodRepository ;
    @Override
    public String uploadFile(MultipartFile file) {
       String fileNameExtension=file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
        String key= UUID.randomUUID().toString()+"."+fileNameExtension;
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .acl("public-read")
                    .contentType(file.getContentType())
                    .build();
            PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
            if (response.sdkHttpResponse().isSuccessful()){
                return "https://"+bucketName+".s3.amazonaws.com/"+key;
            }else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Error occurred on uploading image on s3 (01) -> FoodServiceImpl class");

            }
        }catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Error occurred on uploading image on s3 (02) -> FoodServiceImpl class");
        }
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {
       FoodEntity newFoodEntity = convertToEntity(request);
       String imageUrl= uploadFile(file);
        newFoodEntity.setImageUrl(imageUrl);
      newFoodEntity=  foodRepository.save(newFoodEntity);
    return convertToResponse(newFoodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {
        List<FoodEntity> foodEntities = foodRepository.findAll();
       return foodEntities.stream()
                .map(this::convertToResponse).collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFoodById(String id) {
      FoodEntity foodEntity =  foodRepository.findById(id).orElseThrow(()->new RuntimeException("Food is not found by the given id +"+ id));
      return  convertToResponse(foodEntity);
    }

    @Override
    // this will delete the file from the S3 bucket
    public boolean deletefile(String fileName) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();
        s3Client.deleteObject(deleteObjectRequest);
        return true;
    }

    @Override
    public void deleteFood(String id) {
        FoodResponse response = readFoodById(id);
        String imageUrl= response.getImageUrl();
      String filename=  imageUrl.substring(imageUrl.lastIndexOf("/")+1);
       boolean isFileDeleted =deletefile(filename);
       if (isFileDeleted){
           foodRepository.deleteById(response.getId());
       }
    }

    private FoodEntity convertToEntity(FoodRequest request){
       return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();
    }
    private FoodResponse convertToResponse(FoodEntity foodEntity){
      return   FoodResponse.builder()
                .id(foodEntity.getId())
                .name(foodEntity.getName())
                .description(foodEntity.getDescription())
                .category(foodEntity.getCategory())
                .price(foodEntity.getPrice())
                .imageUrl(foodEntity.getImageUrl())
                .build();
    }


}
