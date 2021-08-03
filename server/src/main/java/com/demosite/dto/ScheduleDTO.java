package com.demosite.dto;

import com.demosite.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Arrays;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ScheduleDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long schedualId;
	private String name;
	private LocalDateTime datetime;
	private User instructor;

	public Long getSchedualId() {
		return schedualId;
	}

	public void setSchedualId(Long schedualId) {
		this.schedualId = schedualId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDateTime getDatetime() {
		return datetime;
	}

	public void setDatetime(LocalDateTime datetime) {
		this.datetime = datetime;
	}

	public User getInstructor() {
		return instructor;
	}

	public void setInstructor(User instructor) {
		this.instructor = instructor;
	}

	@Override
	public String toString() {
		return "ScheduleDTO{" +
				"schedualId=" + schedualId +
				", name='" + name + '\'' +
				", datetime=" + datetime +
				", instructor=" + instructor +
				'}';
	}
}
