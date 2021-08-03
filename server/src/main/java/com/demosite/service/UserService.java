package com.demosite.service;

import java.util.List;

import com.demosite.dto.TokenAndPasswordDTO;
import com.demosite.dto.UserDTO;
import com.demosite.entity.User;

public interface UserService {

	UserDTO save(UserDTO userDTO);

	List<UserDTO> findAll();

	UserDTO findByUserName(String userName);

	void saveTokenForUser(String token, User user);

	void resetPassword(TokenAndPasswordDTO tokenAndPasswordDTO);

	
}
