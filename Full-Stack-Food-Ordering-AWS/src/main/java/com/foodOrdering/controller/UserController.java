package com.foodOrdering.controller;

import com.foodOrdering.Request.UserRequest;
import com.foodOrdering.Request.UserResponse;
import com.foodOrdering.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @GetMapping
    public String  HomeController(){
        return "This is the home page of the User Controller Method";
    }
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request){
      return userService.registerUser(request);

    }
}
