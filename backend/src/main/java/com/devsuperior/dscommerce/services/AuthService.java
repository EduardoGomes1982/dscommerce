package com.devsuperior.dscommerce.services;

import org.springframework.stereotype.Service;

import com.devsuperior.dscommerce.entities.User;
import com.devsuperior.dscommerce.services.exceptions.ForbiddenException;

@Service
public class AuthService {
    private UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public void validateSelfOrAdmin(long userId) {
        User me = userService.authenticated();
        if (!me.hasRole("ROLE_ADMIN") && !me.getId().equals(userId)) {
            throw new ForbiddenException("Access denied");
        }
    }
}
