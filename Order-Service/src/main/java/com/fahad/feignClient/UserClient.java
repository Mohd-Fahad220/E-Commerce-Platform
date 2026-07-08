package com.fahad.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.fahad.dto.UserResponseDto;

@FeignClient(name="user-service", path="${user-service.context-path:}")
public interface UserClient {

	 @GetMapping("/users/id/{id}")
	    UserResponseDto getUserById(@PathVariable Long id);
}
