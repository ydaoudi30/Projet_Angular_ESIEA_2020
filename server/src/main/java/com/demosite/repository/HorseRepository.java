package com.demosite.repository;

import com.demosite.entity.Horses;
import com.demosite.entity.Rides;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HorseRepository extends JpaRepository<Horses, Long> {


}
