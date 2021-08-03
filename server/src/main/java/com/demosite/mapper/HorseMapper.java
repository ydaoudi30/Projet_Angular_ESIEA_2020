package com.demosite.mapper;

import com.demosite.dto.HorseDTO;
import com.demosite.entity.Horses;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface HorseMapper {

	HorseDTO toDTO(Horses horse);

	Horses toEntity(HorseDTO horseDto);
	
}
