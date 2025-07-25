package com.foodOrdering.service.impl;

import com.foodOrdering.Entity.UserEntity;
import com.foodOrdering.Repository.UserRepository;
import com.foodOrdering.Request.UserRequest;
import com.foodOrdering.Request.UserResponse;
import com.foodOrdering.service.AuthenticationFacade;
import com.foodOrdering.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

  private   final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  private final AuthenticationFacade authenticationFacade;


    @Override
    public UserResponse registerUser(UserRequest request) {
      UserEntity newUser= convertToEntity(request);
       newUser = userRepository.save(newUser);
       return convertToResponse(newUser);
    }

    @Override
    public String findByUserId() {
      Authentication auth =  authenticationFacade.getAuthentication();
     String loggedInUserEmail = auth.getName();
     UserEntity  loggedInUser= userRepository.findByEmail(loggedInUserEmail).orElseThrow(()->new UsernameNotFoundException("User not found 'UserServiceImpl'"));
     return loggedInUser.getId();
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
