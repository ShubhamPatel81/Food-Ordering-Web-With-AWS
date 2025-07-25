package com.foodOrdering.service;

import com.foodOrdering.Request.UserRequest;
import com.foodOrdering.Request.UserResponse;

public interface UserService {
   UserResponse registerUser(UserRequest request);
   String findByUserId();
}
