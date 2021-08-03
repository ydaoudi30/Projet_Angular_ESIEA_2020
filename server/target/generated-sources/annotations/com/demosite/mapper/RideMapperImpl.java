package com.demosite.mapper;

import com.demosite.dto.RidesDTO;
import com.demosite.entity.Rides;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2020-11-10T20:41:59+0500",
    comments = "version: 1.3.1.Final, compiler: javac, environment: Java 1.8.0_131 (Oracle Corporation)"
)
@Component
public class RideMapperImpl implements RideMapper {

    @Override
    public RidesDTO toDTO(Rides ride) {
        if ( ride == null ) {
            return null;
        }

        RidesDTO ridesDTO = new RidesDTO();

        ridesDTO.setRideId( ride.getRideId() );
        ridesDTO.setRider( ride.getRider() );
        ridesDTO.setHorse( ride.getHorse() );
        ridesDTO.setScheduale( ride.getScheduale() );

        return ridesDTO;
    }

    @Override
    public Rides toEntity(RidesDTO rideDTO) {
        if ( rideDTO == null ) {
            return null;
        }

        Rides rides = new Rides();

        rides.setRideId( rideDTO.getRideId() );
        rides.setRider( rideDTO.getRider() );
        rides.setHorse( rideDTO.getHorse() );
        rides.setScheduale( rideDTO.getScheduale() );

        return rides;
    }
}
