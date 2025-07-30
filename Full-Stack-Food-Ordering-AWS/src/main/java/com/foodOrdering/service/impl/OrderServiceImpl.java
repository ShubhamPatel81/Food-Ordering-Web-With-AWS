package com.foodOrdering.service.impl;

import com.foodOrdering.Entity.OrderEntity;
import com.foodOrdering.Repository.CartRepository;
import com.foodOrdering.Repository.OrderRepository;

import com.foodOrdering.Request.OrderRequest;
import com.foodOrdering.Request.OrderResponse;
import com.foodOrdering.service.OrderService;
import com.foodOrdering.service.UserService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Value("${razorpay.key.id}")
    private String RAZORPAY_KEY;
    @Value("${razorpay.key.secret}")
    private String RAZORPAY_SECRET   ;

    @Autowired
    private  OrderRepository orderRepository;
    @Autowired
    private  UserService userService;
    @Autowired
    private CartRepository cartRepository;
    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException {
        OrderEntity newOrder = convertToEntity(request);

        // Create Razorpay order
        RazorpayClient razorpayClient = new RazorpayClient(RAZORPAY_KEY, RAZORPAY_SECRET);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", (int) newOrder.getAmount() * 100); // amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("payment_capture", 1);

        Order razorpayOrder = razorpayClient.orders.create(orderRequest);

        // Add Razorpay + user data
        newOrder.setRazorpayOrderId(razorpayOrder.get("id"));
        newOrder.setUserId(userService.findByUserId());

        // ✅ Save only once — now includes orderItemList
        newOrder = orderRepository.save(newOrder);

        return convertToResponse(newOrder);
    }


    @Override
    public void verifyPayment(Map<String, String> paymentData, String status) {
        String razorpayOrderId = paymentData.get("razorpay_order_id"); // ✅ no typo
        System.out.println("Looking for order with razorpayOrderId: " + razorpayOrderId);
//        List<OrderEntity> all = orderRepository.findAll();
//        for (OrderEntity o : all) {
//            System.out.println("IN DB -> " + o.getRazorpayOrderId());
//        }
        OrderEntity existingOrder = orderRepository.findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Order Not found (orderServiceImpl 1) "));

//        System.out.println("Looking for order with razorpayOrderId: " + razorpayOrderId);

        existingOrder.setOrderStatus(status);
//        existingOrder.setRazorpayOrderId(razorpayOrderId);
        existingOrder.setRazorpaySignature(paymentData.get("razorpay_signature"));
        existingOrder.setRazorpayPaymentId(paymentData.get("razorpay_payment_id"));
        orderRepository.save(existingOrder);

        if ("paid".equalsIgnoreCase(status)) {
            cartRepository.deleteByUserId(existingOrder.getUserId());
        }
    }



    @Override
    public List<OrderResponse> getUserOrders() {
        String loggedInUserId = userService.findByUserId();
        List<OrderEntity> list = orderRepository.findByUserId(loggedInUserId);
     return    list.stream().map(entity->convertToResponse(entity)).collect(Collectors.toList());

    }

    @Override
    public void removeOrder(String orderId) {
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<OrderResponse> getOrdersOdAllUsers() {
       List<OrderEntity> list= orderRepository.findAll();
        return     list.stream().map(orderEntity -> convertToResponse(orderEntity)).collect(Collectors.toList());
    }

    @Override
    public void updateOrderStatus(String orderId, String status) {
      OrderEntity entity=  orderRepository.findById(orderId).orElseThrow(()->new RuntimeException("Order Not found (orderServiceImpl 2 "));
      entity.setOrderStatus(status);
      orderRepository.save(entity);
    }


    private OrderResponse convertToResponse(OrderEntity newOrder) {
       return OrderResponse.builder()
               .id(newOrder.getId())
               .amount(newOrder.getAmount())
               .userAddress(newOrder.getUserAddress())
               .userId(newOrder.getUserId())
               .razorpayOrderId(newOrder.getRazorpayOrderId())
               .paymentStatus(newOrder.getPaymentStatus())
               .orderStatus(newOrder.getOrderStatus())
               .email(newOrder.getEmail())
               .phoneNumber(newOrder.getPhoneNumber())
               .orderItemList(newOrder.getOrderItemList())
               .build();

    }

    private OrderEntity convertToEntity(OrderRequest request) {
    return     OrderEntity.builder()
            .userAddress(request.getUserAddress())
            .amount(request.getAmount())
            .orderItemList(request.getOrderItems())
            .email(request.getEmail())
            .phoneNumber(request.getPhoneNumber())
            .orderStatus(request.getOrderStatus())
            .build();
    }
}
