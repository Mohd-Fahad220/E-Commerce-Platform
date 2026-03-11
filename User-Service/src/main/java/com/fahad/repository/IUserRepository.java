package com.fahad.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fahad.entity.UserEntity;

public interface IUserRepository extends JpaRepository<UserEntity, Integer> {
	
	public Optional<UserEntity> findUserByEmail(String email);

}
