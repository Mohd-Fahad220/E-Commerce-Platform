package com.fahad.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fahad.dto.UserCreateRequestDto;
import com.fahad.dto.UserResponseDto;
import com.fahad.dto.UserUpdateRequestDto;
import com.fahad.service.IUserService;

import jakarta.validation.Valid;

@RestController
	@RequestMapping("/users")
	public class UserController {

		
		@Autowired
		private IUserService service;
		
		@PostMapping("/register")
    public ResponseEntity<UserResponseDto> registerUser(@Valid
		                                    @RequestBody UserCreateRequestDto request) {

	 return ResponseEntity.ok(service.registerUser(request));
		}
		
	@GetMapping("/id/{id}")
	public UserResponseDto getUserById(@PathVariable Integer id){
		
		return service.getUserById(id);
		
	}
	
	// to be implement this api in service method
	
	@PreAuthorize("hasRole('ADMIN')")	
	@GetMapping("/allusers")
	public ResponseEntity<List<UserResponseDto>> getAllUsers(
			@RequestParam (defaultValue= "0") int page ,
			@RequestParam (defaultValue= "3") int size ,
			@RequestParam (defaultValue= "id") String sortBy ,
			@RequestParam (defaultValue= "asc") String direction ) {
		
		return ResponseEntity.ok(service.getAllUsers(page,size,sortBy,direction));

	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<UserResponseDto> findUserByEmail(@PathVariable String email){
		UserResponseDto dto = service.getUserByEmail(email);
		return ResponseEntity.ok(dto);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteUserById(@PathVariable Integer id){
		
		service.deleteUserById(id);
		return ResponseEntity.ok("user deleted");
	}
	
	@PutMapping("/fullupdate/{id}")
	public ResponseEntity<UserResponseDto> fullUpdateUser(@PathVariable Integer id , @Valid @RequestBody UserUpdateRequestDto data){
		     UserResponseDto user = service.fullUpdateUser(id, data);
		     return ResponseEntity.ok(user);
	}

 }
		
	   	

