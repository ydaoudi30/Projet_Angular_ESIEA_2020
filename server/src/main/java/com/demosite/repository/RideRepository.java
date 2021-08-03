package com.demosite.repository;

import com.demosite.entity.Rides;
import com.demosite.entity.Scheduals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RideRepository extends JpaRepository<Rides, Long> {


}
