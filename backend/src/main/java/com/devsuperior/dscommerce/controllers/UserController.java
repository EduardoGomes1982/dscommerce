package com.devsuperior.dscommerce.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dscommerce.dto.UserDTO;
import com.devsuperior.dscommerce.services.UserService;

@RestController
@RequestMapping(value = "/user")
public class UserController {
	UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping(value = "/me")
	public ResponseEntity<UserDTO> findById() {
		UserDTO dto = userService.getMe();
		return ResponseEntity.ok(dto);
	}
}
