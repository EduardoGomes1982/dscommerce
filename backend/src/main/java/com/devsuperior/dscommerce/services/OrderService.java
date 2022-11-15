package com.devsuperior.dscommerce.services;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscommerce.dto.OrderDTO;
import com.devsuperior.dscommerce.entities.Order;
import com.devsuperior.dscommerce.repositories.OrderRepository;
import com.devsuperior.dscommerce.services.exceptions.ResourceNotFoundException;

@Service
public class OrderService {
	private static final String RESOURCE_NOT_FOUND = "Recurso não encontrado.";
	
	OrderRepository orderRepository;
	
	public OrderService(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}
	
	@Transactional(readOnly = true)
	public OrderDTO findById(Long id) {
		Optional<Order> result = orderRepository.findById(id);
		Order order = result.orElseThrow(() -> new ResourceNotFoundException(RESOURCE_NOT_FOUND));
		return new OrderDTO(order);
	}
}
