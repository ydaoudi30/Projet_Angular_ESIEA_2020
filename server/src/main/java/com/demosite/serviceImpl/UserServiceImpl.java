package com.demosite.serviceImpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.demosite.entity.enumeration.UserRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.demosite.dto.TokenAndPasswordDTO;
import com.demosite.dto.UserDTO;
import com.demosite.entity.Token;
import com.demosite.entity.User;
import com.demosite.error.BadRequestAlertException;
import com.demosite.error.EmailAlreadyUsedException;
import com.demosite.error.UsernameAlreadyUsedException;
import com.demosite.mapper.UserMapper;
import com.demosite.repository.TokenRepository;
import com.demosite.repository.UserRepository;
import com.demosite.service.UserService;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
	
	private final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private TokenRepository tokenRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	/**
     * Get user with the username.
     * 
     * method to be used to generate JWT.
     *
     *@param username the userName of entity
     * @return the entity with userName.
     */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("Request to load user by username : {} ", username);
		User user = userRepository.findByUserName(username);
		if (user == null) {
			throw new BadRequestAlertException("User not found with username: " + username, null, null);
		}
		return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),
				new ArrayList<>());
	}

	/**
     * to save a new user
     *
     * @param userDTO : the userDTO to create.
     * @return the persisted entity.
     * 
     */
	@Override
	public UserDTO save(UserDTO userDTO) {
		log.info("Request to register user : {} ",userDTO);
		
		userDTO.setEmail(userDTO.getEmail().toLowerCase());
		userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		if(userDTO.getRole()==null){
			userDTO.setRole(UserRole.PUBLIC);
		}else{
			userDTO.setRole(userDTO.getRole());
		}
		
		if (userDTO.getUserId() == null) {
			log.info("Checking if username is already exists with username : {} ", userDTO.getUserName());
			userRepository.findOneByUserName(userDTO.getUserName()).ifPresent(existingUser -> {
				throw new UsernameAlreadyUsedException();
			});
			
			log.info("Checking if email is already exists with email : {} ", userDTO.getEmail());
			userRepository.findOneByEmail(userDTO.getEmail()).ifPresent(existingUser -> {
				throw new EmailAlreadyUsedException();
			});
			
			log.info("Storing user to DB : {} ", userDTO);
		}
		
		User userToSave = userMapper.toEntity(userDTO);
		User user = userRepository.save(userToSave);
		return userMapper.toDTO(user);
	}

	/**
     * Get all the users.
     *
     * @return the list of entities.
     */
	@Override
	public List<UserDTO> findAll() {
		log.info("Request to get all Users");
		List<User> users = userRepository.findAll();
		List<UserDTO> userDTOs = new ArrayList<UserDTO>();
		users.forEach(user -> {
			userDTOs.add(userMapper.toDTO(user));
		});
		return userDTOs;
	}

	/**
     * Get user with the username.
     *
     * @param userName the userName of entity
     * @return the entity with userName.
     */
	@Override
	public UserDTO findByUserName(String userName) {
		log.info("Request to find user by username: {}",userName);
		Optional<User> user = userRepository.findOneByUserName(userName);
		if (user != null) {
			return userMapper.toDTO(user.get());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + userName);
		}
	}

	@Override
	public void saveTokenForUser(String tokenString, User user) {
		log.info("Request to save token: {}",tokenString);
		Token token = new Token();
		token.setToken(tokenString);
		token.setUser(user);
		token.setStatus(true);
		
		Date date = new Date();
		long timeNow = date.getTime();
		long expiryTime = timeNow + Token.getResetPasswordExpiration();
		token.setExpiryDate(expiryTime);
		
		tokenRepository.save(token);
		
	}

	@Override
	public void resetPassword(TokenAndPasswordDTO tokenAndPasswordDTO) {
		log.info("Request to validate token and save the reset password for a user");
		
		Token token = tokenRepository.findByTokenAndStatus(tokenAndPasswordDTO.getToken(), true);
		if(this.validateToken(tokenAndPasswordDTO, token) && 
				token.getUser().getEmail().equalsIgnoreCase(tokenAndPasswordDTO.getEmail())) {
			
			userRepository.findOneByEmail(tokenAndPasswordDTO.getEmail().toLowerCase()).ifPresent(user -> {
				UserDTO userDTO = userMapper.toDTO(user);
				userDTO.setPassword(tokenAndPasswordDTO.getPassword());
				this.save(userDTO);
				// invalidate the token
				token.setStatus(false);
				tokenRepository.save(token);
			});
		}
	}

	/**
     * to validate token
     */
	private boolean validateToken(TokenAndPasswordDTO tokenAndPasswordDTO, Token token) {
		log.info("Checking if token is not null & not expired!");
		if (!tokenAndPasswordDTO.getToken().equals(null)) {
			if (token != null) {
				Date date = new Date();
				long timeNow = date.getTime();
				if (timeNow<=token.getExpiryDate()) {
					return true;
				} else {
					log.info("token is expired!");
					return false;
				}
			} else {
				log.info("no token entity found!");
				return false;
			}
		} else {
			log.info("no token found in tokenAndPasswordDTO");
			return false;
		}
		
	}
	
}
