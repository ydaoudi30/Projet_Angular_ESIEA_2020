package com.demosite.repository;

import com.demosite.entity.Scheduals;
import com.demosite.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Scheduals, Long> {


}
