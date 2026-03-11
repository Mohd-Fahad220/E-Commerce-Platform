package com.fahad.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fahad.dto.UserCreateRequestDto;
import com.fahad.dto.UserResponseDto;
import com.fahad.dto.UserUpdateRequestDto;
import com.fahad.entity.UserEntity;
import com.fahad.repository.IUserRepository;

@Service
public class UserServiceImpl implements IUserService {

	@Autowired
	private IUserRepository repository;
	
	@Autowired
	private PasswordEncoder encoder;
	
	
	
	@Override
	public UserResponseDto registerUser(UserCreateRequestDto request) {
		UserEntity entity = new UserEntity();
		BeanUtils.copyProperties(request,entity);
	    entity.setPassword(encoder.encode(request.getPassword()) );	
	    entity.setRole("USER");
	    entity.setUserActive(true);
	    entity.setUserLocked(false);
		repository.save(entity);
		UserResponseDto response= new UserResponseDto();
		BeanUtils.copyProperties(entity, response);
		return response;
	}



	@Override
	public UserResponseDto getUserById(Integer id) {
      
		//1 -> get logged in user
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		UserDetails userDetails = (UserDetails)auth.getPrincipal();
	    String loggedInEmail = userDetails.getUsername();
		//2 -> get user from db
		UserEntity entity = repository.findById(id)
    		   .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
       
		// 🔥 STEP 3: Check access
	    if (!entity.getEmail().equalsIgnoreCase(loggedInEmail) &&
	        !auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
	        throw new RuntimeException("Access Denied");
	
	    }
	    
	    System.out.println("DB email id :" +entity.getEmail());

	    System.out.println("logged in email :" +loggedInEmail);
	    
	    // convert to dto
       UserResponseDto dto = new UserResponseDto();
       BeanUtils.copyProperties(entity, dto);
		return dto;
	    
	}



	@Override
	public List<UserResponseDto> getAllUsers(
	        int page, int size, String sortBy, String direction) {

	    Sort sort = direction.equalsIgnoreCase("asc") ?
	            Sort.by(sortBy).ascending() :
	            Sort.by(sortBy).descending();

	    Pageable pageable = PageRequest.of(page, size, sort);

	    Page<UserEntity> userPage = repository.findAll(pageable);

	    List<UserResponseDto> dtoList = new ArrayList<>();

	    for (UserEntity entity : userPage.getContent()) {
	        UserResponseDto dto = new UserResponseDto();
	        BeanUtils.copyProperties(entity, dto);
	        dtoList.add(dto);
	    }

	    return dtoList;
	}



	@Override
	public UserResponseDto getUserByEmail(String email) {
		
		UserEntity entity = repository.findUserByEmail(email)
		.orElseThrow(()-> new RuntimeException("email not found with this email "+email));
		
		UserResponseDto dto = new UserResponseDto();
		BeanUtils.copyProperties(entity, dto);
		return dto;
	}



	@Override
	public String deleteUserById(Integer id) {
		
		UserEntity entity = repository.findById(id)
				.orElseThrow(()-> new IllegalArgumentException("id not found"));
		
		 repository.deleteById(id);
		return "user deleted by this id"+entity.getId();
	}



	@Override
	public UserResponseDto fullUpdateUser(Integer id, UserUpdateRequestDto dto) {
		
		UserEntity entity = repository.findById(id)
				.orElseThrow(()-> new IllegalArgumentException("user not found"));
		
		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.setUserActive(dto.isActive());
		
		UserEntity saved = repository.save(entity);
		
		UserResponseDto response = new UserResponseDto();
		BeanUtils.copyProperties(saved, response);

		return response;
	}
	
		
	
}	


