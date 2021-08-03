package com.demosite.mapper;

import com.demosite.dto.UserDTO;
import com.demosite.entity.User;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2020-11-08T22:26:33+0500",
    comments = "version: 1.3.1.Final, compiler: javac, environment: Java 1.8.0_131 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toDTO(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setCreated( user.getCreated() );
        userDTO.setUpdated( user.getUpdated() );
        userDTO.setUserId( user.getUserId() );
        userDTO.setUserName( user.getUserName() );
        userDTO.setEmail( user.getEmail() );
        userDTO.setPhone( user.getPhone() );
        userDTO.setPassword( user.getPassword() );
        userDTO.setRole( user.getRole() );

        return userDTO;
    }

    @Override
    public User toEntity(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User user = new User();

        user.setCreated( userDTO.getCreated() );
        user.setUpdated( userDTO.getUpdated() );
        user.setUserId( userDTO.getUserId() );
        user.setUserName( userDTO.getUserName() );
        user.setEmail( userDTO.getEmail() );
        user.setPhone( userDTO.getPhone() );
        user.setPassword( userDTO.getPassword() );
        user.setRole( userDTO.getRole() );

        return user;
    }
}
