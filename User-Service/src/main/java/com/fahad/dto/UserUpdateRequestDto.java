package com.fahad.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserUpdateRequestDto {
	
	@Size(min= 2 ,message = "name should be atleast 2 characters")
	private String name;
	@Email(message = "email format is not valid")
	private String email;
    private boolean active = true;
}
