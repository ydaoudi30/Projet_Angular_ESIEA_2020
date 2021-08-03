package com.demosite.mapper;

import com.demosite.dto.ScheduleDTO;
import com.demosite.entity.Scheduals;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2020-11-10T20:42:00+0500",
    comments = "version: 1.3.1.Final, compiler: javac, environment: Java 1.8.0_131 (Oracle Corporation)"
)
@Component
public class ScheduleMapperImpl implements ScheduleMapper {

    @Override
    public ScheduleDTO toDTO(Scheduals schedule) {
        if ( schedule == null ) {
            return null;
        }

        ScheduleDTO scheduleDTO = new ScheduleDTO();

        scheduleDTO.setSchedualId( schedule.getSchedualId() );
        scheduleDTO.setName( schedule.getName() );
        scheduleDTO.setDatetime( schedule.getDatetime() );
        scheduleDTO.setInstructor( schedule.getInstructor() );

        return scheduleDTO;
    }

    @Override
    public Scheduals toEntity(ScheduleDTO scheduleDTO) {
        if ( scheduleDTO == null ) {
            return null;
        }

        Scheduals scheduals = new Scheduals();

        scheduals.setSchedualId( scheduleDTO.getSchedualId() );
        scheduals.setName( scheduleDTO.getName() );
        scheduals.setDatetime( scheduleDTO.getDatetime() );
        scheduals.setInstructor( scheduleDTO.getInstructor() );

        return scheduals;
    }
}
