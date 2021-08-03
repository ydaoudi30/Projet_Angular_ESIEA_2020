package com.demosite.entity;


import com.demosite.utils.Constants;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = Constants.TABLE_SCHEDULS)
public class Scheduals implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long schedualId;
	private String name;
	private LocalDateTime datetime;

	@ManyToOne
	@JoinColumn(name = "instructor", referencedColumnName = "userId")
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
		return "User [schedualId=" + schedualId + ", name=" + name + ", datetime=" + datetime + ", instructor=" + instructor+"]";
	}
	
}
