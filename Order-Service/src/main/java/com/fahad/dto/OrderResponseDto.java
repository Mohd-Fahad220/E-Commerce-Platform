package com.fahad.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDto {

	    private Long id;
	    private Long userId;
	    private String productName;
	    private Integer quantity;
	    private Double price;
	    private String status;
}
