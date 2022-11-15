package com.devsuperior.dscommerce.services;

import java.time.Instant;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscommerce.dto.OrderDTO;
import com.devsuperior.dscommerce.entities.Order;
import com.devsuperior.dscommerce.entities.OrderItem;
import com.devsuperior.dscommerce.entities.OrderStatus;
import com.devsuperior.dscommerce.entities.Product;
import com.devsuperior.dscommerce.entities.User;
import com.devsuperior.dscommerce.repositories.OrderRepository;
import com.devsuperior.dscommerce.repositories.ProductRepository;
import com.devsuperior.dscommerce.services.exceptions.ResourceNotFoundException;

@Service
public class OrderService {
	private static final String RESOURCE_NOT_FOUND = "Recurso não encontrado.";
	
	OrderRepository orderRepository;
	ProductRepository productRepository;
	UserService userService;
	
	public OrderService(OrderRepository orderRepository, ProductRepository productRepository, UserService userService) {
		this.orderRepository = orderRepository;
		this.productRepository = productRepository;
		this.userService = userService;
	}
	
	@Transactional(readOnly = true)
	public OrderDTO findById(Long id) {
		Optional<Order> result = orderRepository.findById(id);
		Order order = result.orElseThrow(() -> new ResourceNotFoundException(RESOURCE_NOT_FOUND));
		return new OrderDTO(order);
	}

	@Transactional(readOnly = false)
	public OrderDTO insert(OrderDTO dto) {
		Order order = new Order();
		order.setMoment(Instant.now());
		order.setStatus(OrderStatus.WAITING_PAYMENT);
		
		User user = userService.authenticated();
		order.setClient(user);
		dto.getItems().forEach(i -> {
			Product product = productRepository.getReferenceById(i.getProductId());
			OrderItem item = new OrderItem(order, product, i.getQuantity(), product.getPrice());
			order.getItems().add(item);
		});
		
		orderRepository.save(order);
		return new OrderDTO(order);
	}
}
