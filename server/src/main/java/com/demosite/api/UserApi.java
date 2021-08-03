package com.demosite.api;

import com.demosite.dto.TokenAndPasswordDTO;
import com.demosite.dto.UserDTO;
import com.demosite.entity.User;
import com.demosite.error.BadRequestAlertException;
import com.demosite.repository.UserRepository;
import com.demosite.service.MailService;
import com.demosite.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
public interface UserApi {

	@CrossOrigin(origins = "*")
	@GetMapping("/auth/me")
	ResponseEntity<UserDTO> getLoggedInUser(Principal principal);

	@GetMapping("auth/makeUuid")
	ResponseEntity<String> getUUID();

	@GetMapping("/users")
	ResponseEntity<List<UserDTO>> getAllUsers();

	@PostMapping("/auth/retrievePwd")
	ResponseEntity<String> retrivePasswordSendMail(@RequestBody UserDTO userDTO, HttpServletRequest request);

	@PostMapping("/auth/resetPwd")
	ResponseEntity<String> validateTokenAndResetPassword(@RequestBody TokenAndPasswordDTO tokenAndPasswordDTO);
	
}
