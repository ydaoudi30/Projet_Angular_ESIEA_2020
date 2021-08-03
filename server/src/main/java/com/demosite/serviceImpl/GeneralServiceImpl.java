package com.demosite.serviceImpl;

import com.demosite.dto.HorseDTO;
import com.demosite.dto.RidesDTO;
import com.demosite.dto.ScheduleDTO;
import com.demosite.entity.Horses;
import com.demosite.entity.Rides;
import com.demosite.entity.Scheduals;
import com.demosite.mapper.HorseMapper;
import com.demosite.mapper.RideMapper;
import com.demosite.mapper.ScheduleMapper;
import com.demosite.repository.HorseRepository;
import com.demosite.repository.RideRepository;
import com.demosite.repository.ScheduleRepository;
import com.demosite.repository.TokenRepository;
import com.demosite.service.GeneralService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeneralServiceImpl implements GeneralService {
	
	private final Logger log = LoggerFactory.getLogger(GeneralServiceImpl.class);

	@Autowired
	private HorseRepository horseRepository;

	@Autowired
	private RideRepository rideRepository;

	@Autowired
	private ScheduleRepository scheduleRepository;

	@Autowired
	private HorseMapper horseMapper;

	@Autowired
	private RideMapper rideMapper;

	@Autowired
	private ScheduleMapper scheduleMapper;
	
	@Autowired
	private TokenRepository tokenRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public HorseDTO saveHorse(HorseDTO horseDTO) {
		Horses horseToSave = horseMapper.toEntity(horseDTO);
		Horses horse = horseRepository.save(horseToSave);
		return horseMapper.toDTO(horse);
	}
	@Override
	public List<HorseDTO> getAllHorses() {
		List<Horses> horses = horseRepository.findAll();
		List<HorseDTO> userDTOs = new ArrayList<HorseDTO>();
		horses.forEach(horse -> {
			userDTOs.add(horseMapper.toDTO(horse));
		});
		return userDTOs;
	}


	@Override
	public RidesDTO saveRide(RidesDTO rideDTO) {
		Rides rideToSave = rideMapper.toEntity(rideDTO);
		Rides ride = rideRepository.save(rideToSave);
		return rideMapper.toDTO(ride);
	}

	@Override
	public ScheduleDTO saveSchedule(ScheduleDTO shceduleDTO) {
		Scheduals scheduleToSave = scheduleMapper.toEntity(shceduleDTO);
		Scheduals schedule = scheduleRepository.save(scheduleToSave);
		return scheduleMapper.toDTO(schedule);
	}


	@Override
	public List<ScheduleDTO> getAllSchedules(){
		List<Scheduals> shcedules = scheduleRepository.findAll();
		List<ScheduleDTO> scheduleDTOs = new ArrayList<ScheduleDTO>();
		shcedules.forEach(schedule -> {
			scheduleDTOs.add(scheduleMapper.toDTO(schedule));
		});
		return scheduleDTOs;
	}

	@Override
	public List<RidesDTO> getAllRides(){
		List<Rides> rides = rideRepository.findAll();
		List<RidesDTO> rideDTOs = new ArrayList<RidesDTO>();
		rides.forEach(ride -> {
			rideDTOs.add(rideMapper.toDTO(ride));
		});
		return rideDTOs;
	}
}
