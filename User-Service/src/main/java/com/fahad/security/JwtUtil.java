package com.fahad.security;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.security.Keys;
import java.security.Key;

import io.jsonwebtoken.Jwts;

@Component
public class JwtUtil {

	private final Key  key = Keys.hmacShaKeyFor("mysecretkeymysecretkeymysecretkeymysecretkey".getBytes());
	
	// generate token
	public String GenerateToken(String username) {
		return Jwts.builder()
				.setSubject(username)
                 .setIssuedAt(new Date())
                 .setExpiration(new Date(System.currentTimeMillis() + 1000 *60 *60)) // 1 hours
                 .signWith(key)
                 .compact();
	}
	
	public String extractUsername(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}
	
	public Date extractExpiration(String token) {
	    return Jwts.parserBuilder()
	            .setSigningKey(key)
	            .build()
	            .parseClaimsJws(token)
	            .getBody()
	            .getExpiration();
	}

	
	public boolean isTokenExpired(String token) {
	    return extractExpiration(token).before(new Date());
	}

	
	public boolean validateToken(String token, String username) {
	    final String extractedUsername = extractUsername(token);
	    return extractedUsername.equals(username) && !isTokenExpired(token);
	}

}
