package com.demosite.mapper;

import com.demosite.dto.RidesDTO;
import com.demosite.dto.UserDTO;
import com.demosite.entity.Rides;
import com.demosite.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface RideMapper {
	
	RidesDTO toDTO(Rides ride);

	Rides toEntity(RidesDTO rideDTO);
	
}
