package com.foodOrdering.service.impl;

import com.foodOrdering.Entity.UserEntity;
import com.foodOrdering.Repository.UserRepository;
import com.foodOrdering.Request.UserRequest;
import com.foodOrdering.Request.UserResponse;
import com.foodOrdering.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

  private   final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;


    @Override
    public UserResponse registerUser(UserRequest request) {
      UserEntity newUser= convertToEntity(request);
       newUser = userRepository.save(newUser);
       return convertToResponse(newUser);
    }

    private UserEntity convertToEntity(UserRequest request){

      return   UserEntity.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .build();
    }

    private UserResponse convertToResponse(UserEntity registeredUser){
      return   UserResponse.builder()
                .id(registeredUser.getId())
                .email(registeredUser.getEmail())
                .name(registeredUser.getName())
                .build();
    }
}
