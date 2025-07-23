package com.foodOrdering.service;

import com.foodOrdering.Entity.UserEntity;
import com.foodOrdering.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
     UserEntity user = userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User Not Found By this email 'AppUserService'") );
      return   new User(user.getEmail(),user.getPassword(), Collections.emptyList());
    }
}
