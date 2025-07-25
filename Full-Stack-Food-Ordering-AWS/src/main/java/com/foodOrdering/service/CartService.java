package com.foodOrdering.service;

import com.foodOrdering.Request.CartRequest;
import com.foodOrdering.Request.CartResponse;

public interface CartService {

   CartResponse addToCart(CartRequest request);
   CartResponse getCart();

   void clearCart();

  CartResponse  removeFromCart(CartRequest cartRequest);

}
