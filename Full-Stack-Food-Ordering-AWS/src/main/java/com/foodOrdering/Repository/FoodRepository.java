package com.foodOrdering.Repository;

import com.foodOrdering.Entity.FoodEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

@Repository
public interface FoodRepository extends MongoRepository<FoodEntity, String> {
}
