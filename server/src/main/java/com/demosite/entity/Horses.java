package com.demosite.entity;


import com.demosite.entity.enumeration.UserRole;
import com.demosite.utils.Constants;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = Constants.TABLE_HORSES)
public class Horses implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long horseId;
    private String name;
	@Lob
	private byte[] image;
	private boolean available;

	private LocalDateTime created;
	private LocalDateTime updated;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@PrePersist
	protected void onCreate() {
		created = LocalDateTime.now();
	}

	@PreUpdate
	protected void onUpdate() {
		updated = LocalDateTime.now();
	}
	
	public LocalDateTime getCreated() {
		return created;
	}

	public void setCreated(LocalDateTime created) {
		this.created = created;
	}

	public LocalDateTime getUpdated() {
		return updated;
	}

	public void setUpdated(LocalDateTime updated) {
		this.updated = updated;
	}

	public Long getHorseId() {
		return horseId;
	}

	public void setHorseId(Long horseId) {
		this.horseId = horseId;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	@Override
	public String toString() {
		return "User [horseId=" + horseId + ", available=" + available + ", image=" + image + ", created=" + created + ", updated=" + updated
				+ "]";
	}
	
}
