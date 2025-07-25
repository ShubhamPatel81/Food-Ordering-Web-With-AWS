package com.foodOrdering.service.impl;

import com.foodOrdering.Entity.CartEntity;
import com.foodOrdering.Repository.CartRepository;
import com.foodOrdering.Request.CartRequest;
import com.foodOrdering.Request.CartResponse;
import com.foodOrdering.service.CartService;
import com.foodOrdering.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor

public class CartServiceImpl implements CartService {

   private final CartRepository cartRepository;
   private final UserService userService;
    @Override
    public CartResponse addToCart(CartRequest  request) {

          String loggedInUserId =  userService.findByUserId();
         Optional<CartEntity>cartEntityOptional = cartRepository.findByUserId(loggedInUserId);
         CartEntity cart=   cartEntityOptional.orElseGet(()-> new CartEntity(loggedInUserId,new HashMap<>()));
        Map<String,Integer> cartItems= cart.getItems();
        cartItems.put(request.getFoodId(),cartItems.getOrDefault(request.getFoodId(),0)+1);
         cart.setItems(cartItems);
      cart =  cartRepository.save(cart);
      return   convertToResponse(cart);
    }

    @Override
    public CartResponse getCart() {
        String loggedInUserId =  userService.findByUserId();
       CartEntity entity = cartRepository.findByUserId(loggedInUserId).orElse(new CartEntity(null, loggedInUserId,new HashMap<>()));
       return convertToResponse(entity);
    }

    @Override
    public void clearCart() {
        String loggedInUserId = userService.findByUserId();
        cartRepository.deleteByUserId(loggedInUserId);
    }

    @Override
    public CartResponse removeFromCart(CartRequest cartRequest) {
        String  loggedInUserId = userService.findByUserId();
        CartEntity entity= cartRepository.findByUserId(loggedInUserId).orElseThrow(()->new RuntimeException("Cart is not found !!"));
      Map<String, Integer> cartItem=  entity.getItems();
      if (cartItem.containsKey(cartRequest.getFoodId())){
        int currentQuantity=cartItem.get(cartRequest.getFoodId());
        if (currentQuantity > 0){
            cartItem.put(cartRequest.getFoodId(), currentQuantity-1);
        }
        else {
            cartItem.remove(cartRequest.getFoodId());
        }
          entity =cartRepository.save(entity);
      }
    return   convertToResponse(entity);
    }

    private CartResponse convertToResponse(CartEntity entity){
      return   CartResponse.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .items(entity.getItems())
                .build();

    }
}
