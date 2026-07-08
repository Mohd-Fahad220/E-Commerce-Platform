package com.fahad.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fahad.dto.OrderRequestDto;
import com.fahad.dto.OrderResponseDto;
import com.fahad.dto.UserResponseDto;
import com.fahad.entity.OrderEntity;
import com.fahad.feignClient.UserClient;
import com.fahad.repository.OrderRepository;

@Service
public class OrderServiceImpl implements IOrderService {
	
	@Autowired
	private UserClient client;
	
	@Autowired
	private OrderRepository orderRepo;
	
	
	// this method is for mapping entity to Order response object
	private OrderResponseDto mapToDto(OrderEntity order) {

        OrderResponseDto dto = new OrderResponseDto();

        dto.setId(order.getOid());
        dto.setUserId(order.getUserId());
        dto.setProductName(order.getProductName());
        dto.setQuantity(order.getQuantity());
        dto.setPrice(order.getPrice());
        dto.setStatus(order.getStatus());

        return dto;
    }

	@Override
	public OrderResponseDto createOrder(OrderRequestDto request) {
		
		// Validate user 
		UserResponseDto user = client.getUserById(request.getUserId());		
		if(user==null) {
			throw new RuntimeException("User not found");
		}
		
		// create order
        OrderEntity order = new OrderEntity();
        order.setUserId(request.getUserId());
        order.setProductName(request.getProductName());
        order.setQuantity(request.getQuantity());
        double price = Math.round(new Random().nextDouble(2000.0) * 10000 * 100.0) / 1000.0;
        order.setPrice(price); // random price i am setting 
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("Order Placed");
        // save to db
        OrderEntity saved = orderRepo.save(order);
        
        // return response by mapping to UserResponseDto just by calling method which is created in the beginning 
		return mapToDto(saved);
	}

	@Override
	public OrderResponseDto getOrderById(Long id) {
     OrderEntity details = orderRepo.findById(id)
    		 .orElseThrow(() -> new RuntimeException("order not found"));
		
     return mapToDto(details);
	}

	@Override
	public List<OrderResponseDto> getOrdersByUserId(Long userId) {

	List<OrderEntity> details =	orderRepo.findByUserId(userId);
	 
		
		return details.stream()
				.map(this::mapToDto)
				.toList();
	}

	@Override
	public String cancelOrder(Long id) {
		
		orderRepo.findById(id)
		 .orElseThrow(() -> new RuntimeException("order not found"));
		
		orderRepo.deleteById(id);
		
		return "Order cancelled successfully";
	}

}
