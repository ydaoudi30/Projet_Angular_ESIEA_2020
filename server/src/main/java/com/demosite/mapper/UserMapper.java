package com.demosite.mapper;

import org.mapstruct.Mapper;

import com.demosite.dto.UserDTO;
import com.demosite.entity.User;

@Mapper(componentModel = "spring", uses = {})
public interface UserMapper {
	
	UserDTO toDTO(User user);

	User toEntity(UserDTO userDTO);
	
}
