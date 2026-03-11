package com.fahad.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserCreateRequestDto {
	
	@NotBlank(message = "name is required")
	private String name;
	
	@NotBlank(message = "email id is required")
	@Email(message = "email format is not valid")
	private String email;
	
	@NotBlank(message = "password is required")
	@Size(min = 6 , message = "password length must be atleast 6 characters")
	private String password;

}
