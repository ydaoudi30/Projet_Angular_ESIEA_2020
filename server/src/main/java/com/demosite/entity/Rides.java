package com.demosite.entity;


import com.demosite.utils.Constants;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = Constants.TABLE_RIDES)
public class Rides implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long rideId;

	@ManyToOne
	@JoinColumn(name = "rider", referencedColumnName = "userId")
	private User rider;

	@ManyToOne
	@JoinColumn(name = "horse", referencedColumnName = "horseId")
	private Horses horse;

	@ManyToOne
	@JoinColumn(name = "scheduale", referencedColumnName = "schedualId")
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
		return "User [rideId=" + rideId + ", rider=" + rider + ", horse=" + horse + ", scheduale=" + scheduale+"]";
	}
	
}
