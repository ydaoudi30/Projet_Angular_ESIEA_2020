package com.demosite.service;

import com.demosite.dto.*;
import com.demosite.entity.User;

import java.util.List;

public interface GeneralService {

    HorseDTO saveHorse(HorseDTO horseDTO);
    RidesDTO saveRide(RidesDTO rideDTO);
    ScheduleDTO saveSchedule(ScheduleDTO shceduleDTO);

    List<HorseDTO> getAllHorses();
    List<ScheduleDTO> getAllSchedules();
    List<RidesDTO> getAllRides();
//
//    UserDTO findByUserName(String userName);
//
//    void saveTokenForUser(String token, User user);
//
//    void resetPassword(TokenAndPasswordDTO tokenAndPasswordDTO);

}
