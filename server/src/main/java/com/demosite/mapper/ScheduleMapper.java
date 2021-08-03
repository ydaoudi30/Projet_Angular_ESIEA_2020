package com.demosite.mapper;

import com.demosite.dto.ScheduleDTO;
import com.demosite.dto.UserDTO;
import com.demosite.entity.Scheduals;
import com.demosite.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface ScheduleMapper {
	
	ScheduleDTO toDTO(Scheduals schedule);

	Scheduals toEntity(ScheduleDTO scheduleDTO);
	
}
