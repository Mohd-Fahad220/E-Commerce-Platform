package com.fahad.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fahad.dto.LoginRequestDto;
import com.fahad.security.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequestDto request){
		
		// step 1 -> authenticate userName and password 
		authManager.authenticate(new UsernamePasswordAuthenticationToken(
				                         request.getEmail(), request.getPassword()));
		
		// step 2 -> generate token 
		String token = jwtUtil.GenerateToken(request.getEmail());
		
		// step 3 -> return token 
		return ResponseEntity.ok(Map.of("token",token));
	}

}
