package com.demosite.mapper;

import com.demosite.dto.HorseDTO;
import com.demosite.entity.Horses;
import java.util.Arrays;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2020-11-10T22:05:57+0500",
    comments = "version: 1.3.1.Final, compiler: javac, environment: Java 1.8.0_131 (Oracle Corporation)"
)
@Component
public class HorseMapperImpl implements HorseMapper {

    @Override
    public HorseDTO toDTO(Horses horse) {
        if ( horse == null ) {
            return null;
        }

        HorseDTO horseDTO = new HorseDTO();

        horseDTO.setHorseId( horse.getHorseId() );
        horseDTO.setName( horse.getName() );
        byte[] image = horse.getImage();
        if ( image != null ) {
            horseDTO.setImage( Arrays.copyOf( image, image.length ) );
        }
        horseDTO.setAvailable( horse.isAvailable() );
        horseDTO.setCreated( horse.getCreated() );
        horseDTO.setUpdated( horse.getUpdated() );

        return horseDTO;
    }

    @Override
    public Horses toEntity(HorseDTO horseDto) {
        if ( horseDto == null ) {
            return null;
        }

        Horses horses = new Horses();

        horses.setName( horseDto.getName() );
        horses.setCreated( horseDto.getCreated() );
        horses.setUpdated( horseDto.getUpdated() );
        horses.setHorseId( horseDto.getHorseId() );
        byte[] image = horseDto.getImage();
        if ( image != null ) {
            horses.setImage( Arrays.copyOf( image, image.length ) );
        }
        horses.setAvailable( horseDto.isAvailable() );

        return horses;
    }
}
