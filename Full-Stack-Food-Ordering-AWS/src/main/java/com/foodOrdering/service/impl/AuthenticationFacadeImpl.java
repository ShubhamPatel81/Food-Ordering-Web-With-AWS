package com.foodOrdering.service.impl;

import com.foodOrdering.service.AuthenticationFacade;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacadeImpl implements AuthenticationFacade {
    @Override
    public Authentication getAuthentication() {
      return   SecurityContextHolder.getContext().getAuthentication();
    }
}
