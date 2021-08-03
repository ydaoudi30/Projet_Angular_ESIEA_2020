package com.demosite.jwt.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.demosite.dto.UserDTO;
import com.demosite.error.BadRequestAlertException;
import com.demosite.jwt.config.JwtTokenUtil;
import com.demosite.jwt.model.JwtRequest;
import com.demosite.jwt.model.JwtResponse;
import com.demosite.redis.model.RedisUser;
import com.demosite.redis.repo.RedisUserRepo;
import com.demosite.service.UserService;
import com.demosite.serviceImpl.UserServiceImpl;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserServiceImpl userServiceImpl;
	
	@Autowired
	private RedisUserRepo redisUserRepo;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getUserName(), authenticationRequest.getPassword());

		final UserDetails userDetails = userServiceImpl.loadUserByUsername(authenticationRequest.getUserName());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}
	
	@RequestMapping(value = "/authenticate-with-uuid", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationTokenForVisitor(@RequestBody RedisUser redisUser) throws Exception {

		// check to redisDB for authentication!

		RedisUser redisUser2 = redisUserRepo.findByUserName(redisUser.getUserName());

		if (redisUser2.getUuid().equals(redisUser.getUuid())) {

			authenticate(redisUser.getUserName(), redisUser.getPassword());

			final UserDetails userDetails = userServiceImpl.loadUserByUsername(redisUser.getUserName());

			final String token = jwtTokenUtil.generateToken(userDetails);

			return ResponseEntity.ok(new JwtResponse(token));
		} else {
			throw new BadRequestAlertException("Bad credentials or UUID! ", null, null);
		}

	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody UserDTO userDTO) throws Exception {
		return ResponseEntity.ok(userService.save(userDTO));
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		// return "redirect:/"; // to redirect to particular page
		return "Logout successful!";
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
