package com.demosite.controllers;

import java.net.URISyntaxException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import com.demosite.api.UserApi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demosite.dto.TokenAndPasswordDTO;
import com.demosite.dto.UserDTO;
import com.demosite.entity.User;
import com.demosite.error.BadRequestAlertException;
import com.demosite.repository.UserRepository;
import com.demosite.service.MailService;
import com.demosite.service.UserService;

/**
 * REST api for managing {@link User}
 */
@RestController
@CrossOrigin(origins = "*")
public class UserController  implements UserApi {
	private final Logger log = LoggerFactory.getLogger(UserController.class);

	private final UserService userService;
	private final MailService mailService;
	private final UserRepository userRepository;

	public UserController(UserService userService, UserRepository userRepository, MailService mailService) {
		this.userService = userService;
		this.userRepository = userRepository;
		this.mailService = mailService;
	}

	@Override
	public ResponseEntity<UserDTO> getLoggedInUser(Principal principal) {
		log.info("Rest request to get information of logged in user by token!");
		String userName = principal.getName();
		UserDTO userDTO = userService.findByUserName(userName);
		return ResponseEntity.ok().body(userDTO);
	}

	@Override
	public ResponseEntity<String> getUUID() {
		log.info("Rest request to generate random UUID.");
		return ResponseEntity.ok().body(UUID.randomUUID().toString());
	}

	@Override
	public ResponseEntity<List<UserDTO>> getAllUsers() {
		log.info("Rest request to get all users");
		List<UserDTO> userDTOs = userService.findAll();
		return ResponseEntity.ok().body(userDTOs);
	}

	@Override
	public ResponseEntity<String> retrivePasswordSendMail(UserDTO userDTO, HttpServletRequest request) {
		log.info("Rest request to send mail on {} ", userDTO.getEmail());
		// check if user with email present or not?
		Optional<User> user = userRepository.findOneByEmail(userDTO.getEmail().toLowerCase());
		
		if (!user.isPresent()) {
			// TODO : make a custom exception for UserNotFound!
			throw new BadRequestAlertException("user not found with email : "+userDTO.getEmail(), null, null);
		} else {

			// generate & save token before sending a mail
			String token = UUID.randomUUID().toString();
			userService.saveTokenForUser(token, user.get());

			// generate URL for mail
			StringBuffer url = request.getRequestURL();
			String uri = request.getRequestURI();
			String ctx = request.getContextPath();
			String base = url.substring(0, url.length() - uri.length() + ctx.length()) + "/";

			String passwordResetURL = base + "setNewPassword?id=" + user.get().getUserId() + "&token=" + token;
			System.out.println("passwordResetURL: " + passwordResetURL);

			// send mail
			mailService.sendPasswordResetMail(user.get(), passwordResetURL);

		}

		return ResponseEntity.ok().body("mail sent succesfully to " + user.get().getEmail());
	}

	@Override
	public ResponseEntity<String> validateTokenAndResetPassword(TokenAndPasswordDTO tokenAndPasswordDTO) {
		log.info("Rest request to validate token and reset password");
		userService.resetPassword(tokenAndPasswordDTO);
		return ResponseEntity.ok().body("");
	}
	
}
