package com.fahad.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
	
	 @Autowired
	    private JwtUtil jwtUtil;

	    @Autowired
	    private CustomUserDetailsService userDetailsService;

	    @Override
	    protected void doFilterInternal(HttpServletRequest request,
	                                    HttpServletResponse response,
	                                    FilterChain filterChain)
	            throws ServletException, IOException {

	        String header = request.getHeader("Authorization");

	        // 🔴 If no token → continue
	        if (header == null || !header.startsWith("Bearer")) {
	            filterChain.doFilter(request, response);
	            return;
	        }

	        // 🟢 Extract token
	        String token = header.substring(7);

	        // 🟢 Extract username from token
	        String username = jwtUtil.extractUsername(token);

	        // 🟢 Load user from DB
	        UserDetails userDetails =
	                userDetailsService.loadUserByUsername(username);

	        // 🟢 Validate token
	        if (jwtUtil.validateToken(token, username)) {

	            UsernamePasswordAuthenticationToken auth =
	                    new UsernamePasswordAuthenticationToken(
	                            userDetails,
	                            null,
	                            userDetails.getAuthorities()
	                    );

	            // 🔥 Tell Spring: user is authenticated
	            SecurityContextHolder.getContext().setAuthentication(auth);
	        }

	        filterChain.doFilter(request, response);
	    }

}
