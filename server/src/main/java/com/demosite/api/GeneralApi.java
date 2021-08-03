package com.demosite.api;

import com.demosite.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public interface GeneralApi {

	@CrossOrigin(origins = "*")
	@PostMapping("/pjweb/addhorse")
	ResponseEntity<?> saveHorse(@RequestBody HorseDTO horseDTO);

	@CrossOrigin(origins = "*")
	@PostMapping("/pjweb/addSchedule")
	ResponseEntity<?> saveSchedule(@RequestBody ScheduleDTO scheduleDTO);

	@CrossOrigin(origins = "*")
	@PostMapping("/pjweb/addRide")
	ResponseEntity<?> saveRide(@RequestBody RidesDTO rideDTO);

	@GetMapping("/pjweb/horses")
	ResponseEntity<List<HorseDTO>> getAllHorses();

	@GetMapping("/pjweb/schedules")
	ResponseEntity<List<ScheduleDTO>> getAllschedules();

	@GetMapping("/pjweb/rides")
	ResponseEntity<List<RidesDTO>> getAllRides();



}
