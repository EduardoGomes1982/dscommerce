package com.devsuperior.dscommerce.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscommerce.dto.ProductDTO;
import com.devsuperior.dscommerce.dto.ProductMinDTO;
import com.devsuperior.dscommerce.entities.Category;
import com.devsuperior.dscommerce.entities.Product;
import com.devsuperior.dscommerce.repositories.ProductRepository;
import com.devsuperior.dscommerce.services.exceptions.DatabaseException;
import com.devsuperior.dscommerce.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {
	private static final String RESOURCE_NOT_FOUND = "Recurso não encontrado.";
	private static final String VIOLATION_OF_INTEGRITY = "Erro de integridade, não é possível apagar.";
	
	ProductRepository productRepository;

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> result = productRepository.findById(id);
		Product product = result.orElseThrow(() -> new ResourceNotFoundException(RESOURCE_NOT_FOUND));
		return new ProductDTO(product);
	}

	@Transactional(readOnly = true)
	public Page<ProductMinDTO> findAll(String name, Pageable pageable) {
		Page<Product> result = productRepository.searchByName(name, pageable);
		return result.map(p -> new ProductMinDTO(p));
	}

	@Transactional(readOnly = false)
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product();
		copyDtoToEntity(dto, entity);
		entity = productRepository.save(entity);
		return new ProductDTO(entity);
	}

	@Transactional(readOnly = false)
	public ProductDTO update(Long id, ProductDTO dto) {
		Product entity = productRepository.getReferenceById(id);
		copyDtoToEntity(dto, entity);
		entity = productRepository.save(entity);
		return new ProductDTO(entity);
	}

	@Transactional(readOnly = false, propagation = Propagation.SUPPORTS)
	public void delete(Long id) {
		try {
			productRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException(RESOURCE_NOT_FOUND);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException(VIOLATION_OF_INTEGRITY);
		}		
	}

	private void copyDtoToEntity(ProductDTO dto, Product entity) {
		try {
			entity.setName(dto.getName());
			entity.setDescription(dto.getDescription());
			entity.setPrice(dto.getPrice());
			entity.setImgUrl(dto.getImgUrl());
			entity.getCategories().clear();
			
			dto.getCategories().forEach(c -> {
				Category cat = new Category();
				cat.setId(c.getId());
				entity.getCategories().add(cat);
			});
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(RESOURCE_NOT_FOUND);
		}
	}
}
