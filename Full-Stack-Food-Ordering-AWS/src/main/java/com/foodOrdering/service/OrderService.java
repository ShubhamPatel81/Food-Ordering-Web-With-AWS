package com.foodOrdering.service;

import com.foodOrdering.Request.OrderRequest;
import com.foodOrdering.Request.OrderResponse;
import com.razorpay.RazorpayException;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.util.List;
import java.util.Map;

public interface OrderService {

   OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException;

   void verifyPayment(Map<String,String> paymentData,String status);

   List<OrderResponse>  getUserOrders();

  void removeOrder(String orderId);

  List<OrderResponse> getOrdersOdAllUsers();

 void updateOrderStatus(String orderId, String status);


}
