package com.demosite.controllers;

import com.demosite.api.GeneralApi;
import com.demosite.api.UserApi;
import com.demosite.dto.*;
import com.demosite.entity.User;
import com.demosite.error.BadRequestAlertException;
import com.demosite.repository.UserRepository;
import com.demosite.service.GeneralService;
import com.demosite.service.MailService;
import com.demosite.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * REST api for managing {@link User}
 */
@RestController
@CrossOrigin(origins = "*")
public class GeneralController implements GeneralApi {
	private final Logger log = LoggerFactory.getLogger(GeneralController.class);

	private final GeneralService generalService;

	public GeneralController(GeneralService generalService) {
		this.generalService = generalService;
	}

	@Override
	public ResponseEntity<?> saveHorse(@RequestBody HorseDTO horseDTO){
		return ResponseEntity.ok(generalService.saveHorse(horseDTO));
	}

	@Override
	public ResponseEntity<?> saveRide(@RequestBody RidesDTO rideDTO){
		return ResponseEntity.ok(generalService.saveRide(rideDTO));
	}

	@Override
	public ResponseEntity<?> saveSchedule(@RequestBody ScheduleDTO scheduleDTO){
		return ResponseEntity.ok(generalService.saveSchedule(scheduleDTO));
	}

	@Override
	public ResponseEntity<List<HorseDTO>> getAllHorses() {
		log.info("Rest request to get all users");
		List<HorseDTO> horseDTOs = generalService.getAllHorses();
		return ResponseEntity.ok().body(horseDTOs);
	}

	@Override
	public ResponseEntity<List<RidesDTO>> getAllRides() {
		log.info("Rest request to get all users");
		List<RidesDTO> rideDTOs = generalService.getAllRides();
		return ResponseEntity.ok().body(rideDTOs);
	}

	@Override
	public ResponseEntity<List<ScheduleDTO>> getAllschedules() {
		log.info("Rest request to get all users");
		List<ScheduleDTO> scheduleDTOs = generalService.getAllSchedules();
		return ResponseEntity.ok().body(scheduleDTOs);
	}
}
