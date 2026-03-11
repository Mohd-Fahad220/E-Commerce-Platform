package com.fahad.service;

import java.util.List;

import com.fahad.dto.OrderRequestDto;
import com.fahad.dto.OrderResponseDto;

public interface IOrderService {

	 OrderResponseDto createOrder(OrderRequestDto request);

	 OrderResponseDto getOrderById(Long id);

	 List<OrderResponseDto> getOrdersByUserId(Long userId);

	 String cancelOrder(Long id);
	
}
