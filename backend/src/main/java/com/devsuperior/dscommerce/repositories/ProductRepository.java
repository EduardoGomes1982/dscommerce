package com.devsuperior.dscommerce.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.dscommerce.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	@Query("select obj from Product obj where upper(obj.name) like concat('%', upper(:name), '%')")
	Page<Product> searchByName(String name, Pageable pageable);
}
