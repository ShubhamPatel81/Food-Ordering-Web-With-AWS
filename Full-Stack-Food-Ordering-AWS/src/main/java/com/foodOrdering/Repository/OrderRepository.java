package com.foodOrdering.Repository;

import com.foodOrdering.Entity.OrderEntity;
import com.foodOrdering.Entity.UserEntity;
import com.razorpay.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.util.List;
import java.util.Optional;
@Repository

public interface OrderRepository extends MongoRepository<OrderEntity, String> {

   List<OrderEntity> findByUserId(String userId);
    Optional<OrderEntity> findByRazorpayOrderId(String razorpayOrderId);


}
