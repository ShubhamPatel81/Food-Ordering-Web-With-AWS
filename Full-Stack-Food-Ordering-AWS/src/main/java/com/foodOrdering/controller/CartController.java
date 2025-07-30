package com.foodOrdering.controller;

import com.foodOrdering.Request.CartRequest;
import com.foodOrdering.Request.CartResponse;
import com.foodOrdering.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {

private final CartService cartService;
    @PostMapping
    public CartResponse addToCart(@RequestBody CartRequest request){
       String foodId= request.getFoodId();
//        System.out.println("HIT ADD TO CART API");
       if (foodId == null || foodId.isEmpty()){
           throw  new ResponseStatusException(HttpStatus.BAD_REQUEST,"Food id is required CartController 1 ");
       }
      return cartService.addToCart(request);
    }

    @GetMapping
    public CartResponse getCart(){
         return cartService.getCart();
    }

    @DeleteMapping("/clear")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearCart(){
        cartService.clearCart();
    }

    @PostMapping("/remove")
    public  CartResponse removeFroMCart(@RequestBody  CartRequest request){
        String foodId= request.getFoodId();
        if (foodId == null || foodId.isEmpty()){
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST,"Food id is required CartController 2 ");
        }
      return   cartService.removeFromCart(request);
    }
}
