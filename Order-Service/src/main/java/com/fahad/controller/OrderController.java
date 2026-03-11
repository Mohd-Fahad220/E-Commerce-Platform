package com.fahad.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fahad.dto.OrderRequestDto;
import com.fahad.dto.OrderResponseDto;
import com.fahad.service.IOrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
	
	@Autowired
	private IOrderService service;
	
	@PostMapping
	public ResponseEntity<OrderResponseDto> createOrders(@RequestBody OrderRequestDto dto){		
		return ResponseEntity.ok(service.createOrder(dto));		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<OrderResponseDto> getOrderById(@PathVariable Long id){
		return ResponseEntity.ok(service.getOrderById(id));
	}
	
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponseDto>> getOrdersByUser(@PathVariable Long userId) {
	        return ResponseEntity.ok(service.getOrdersByUserId(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelOrder(@PathVariable Long id) {
	       return ResponseEntity.ok(service.cancelOrder(id));
	}
	

}
