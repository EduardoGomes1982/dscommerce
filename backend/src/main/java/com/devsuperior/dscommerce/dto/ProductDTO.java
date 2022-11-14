package com.devsuperior.dscommerce.dto;

import com.devsuperior.dscommerce.entities.Product;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

public class ProductDTO {
	private Long id;

	@NotBlank(message = "Campo requerido.")
	@Size(min = 3, max = 80, message = "Nome precisa ter de 3 a 80 caracteres.")
	private String name;

	@NotBlank(message = "Campo requerido.")
	@Size(min = 10, message = "Descrição precisa ter mais de 10 caracteres.")
	private String description;

	@Positive(message = "Preço deve ser maior que zero.")
	private Double price;
	private String imgUrl;
	
	@NotEmpty(message = "Deve haver pelo menos uma categoria")
	private List<CategoryDTO> categories = new ArrayList<>();

	public ProductDTO(Long id, String name, String description, Double price, String imgUrl) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.imgUrl = imgUrl;
	}

	public ProductDTO(Product entity) {
		this(entity.getId(), entity.getName(), entity.getDescription(), entity.getPrice(), entity.getImgUrl());
		entity.getCategories().forEach(c -> categories.add(new CategoryDTO(c)));
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public Double getPrice() {
		return price;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public List<CategoryDTO> getCategories() {
		return categories;
	}
}
