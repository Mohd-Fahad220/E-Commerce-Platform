package com.fahad.service;


import java.util.List;

import com.fahad.dto.UserCreateRequestDto;
import com.fahad.dto.UserResponseDto;
import com.fahad.dto.UserUpdateRequestDto;

public interface IUserService {
	
	public UserResponseDto registerUser(UserCreateRequestDto request);
	public UserResponseDto getUserById(Integer id);
	public UserResponseDto getUserByEmail(String email);
	public List<UserResponseDto> getAllUsers(int page, int size, String sortBy,String direction);	
	public String deleteUserById(Integer id);
	public UserResponseDto fullUpdateUser(Integer id,UserUpdateRequestDto dto);


}
