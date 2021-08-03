package com.demosite.dto;

import com.demosite.entity.Horses;
import com.demosite.entity.Scheduals;
import com.demosite.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;
import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class RidesDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long rideId;
	private User rider;
	private Horses horse;
	private Scheduals scheduale;

	public Long getRideId() {
		return rideId;
	}

	public void setRideId(Long rideId) {
		this.rideId = rideId;
	}

	public User getRider() {
		return rider;
	}

	public void setRider(User rider) {
		this.rider = rider;
	}

	public Horses getHorse() {
		return horse;
	}

	public void setHorse(Horses horse) {
		this.horse = horse;
	}

	public Scheduals getScheduale() {
		return scheduale;
	}

	public void setScheduale(Scheduals scheduale) {
		this.scheduale = scheduale;
	}

	@Override
	public String toString() {
		return "RidesDTO{" +
				"rideId=" + rideId +
				", rider=" + rider +
				", horse=" + horse +
				", scheduale=" + scheduale +
				'}';
	}
}
