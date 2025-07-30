package com.foodOrdering.Entity;

import com.foodOrdering.Request.OrderItem;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "orders")
@Data@Builder
public class OrderEntity {

    @Id
    private String id;
    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;
    private List<OrderItem> orderItemList;
    private String  razorpayPaymentId;
    private double amount;
    private String paymentStatus;
//    @Column(name = "razorpay_order_id")
 @Indexed(unique = true)
private String razorpayOrderId;
    private String razorpaySignature;
    private  String orderStatus;
}
