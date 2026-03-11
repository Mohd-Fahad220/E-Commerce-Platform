package com.fahad.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fahad.security.CustomUserDetailsService;
import com.fahad.security.JwtFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
	
	private final CustomUserDetailsService detailsService;
	
	// Constructor Injection
	public SecurityConfig(CustomUserDetailsService detailsService) {		
		this.detailsService = detailsService;
	}
	
	@Autowired
	private JwtFilter jwtFilter; 
	
	 @Bean
	 public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

	        http
	            .csrf(csrf -> csrf.disable())
	            .authorizeHttpRequests(auth -> auth
	                .requestMatchers("/auth/login", "/users/register").permitAll()
	                .requestMatchers("/users/id/**").permitAll()
	                .requestMatchers("/users").hasRole("ADMIN")
	                .requestMatchers("/users/*") .authenticated()	           
	                .anyRequest().authenticated()
                 
	            		) 
	            
	            .userDetailsService(detailsService)      // key line
	            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // 🔥 KEY

	        return http.build();
	    }
	 
	 @Bean
	 public PasswordEncoder encoder() {
		 return new BCryptPasswordEncoder();
	 }
	 
	 @Bean
	 public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
		 return config.getAuthenticationManager();
	 }

}
