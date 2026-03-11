package com.fahad.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class UserEntity {
	
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Integer id;
		
		@Column(length=30)
		@NonNull
		private String name;
		
		@Column(length=30)
		@NonNull
		private String email;
		
		@Column(length=255)
		@NonNull
		private String password;
		
		@Column(nullable = false)
		private String role;
		
		
		// meta data properties
		
		@Version
		private Integer updateCount;
		
		@Column(name ="Active_Switch")
		private boolean userActive=true;
		
		@Column(name = "User_Locked")
		private boolean userLocked= false;
		
		@CreationTimestamp
		@Column(insertable = true,updatable = false)
		private String createdTime;
		
		@UpdateTimestamp
		@Column(insertable = false,updatable = true)
		private String updatedTime;
	}


