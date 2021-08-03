package com.demosite.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.Lob;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Arrays;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class HorseDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long horseId;
	private String name;
	@Lob
	private byte[] image;
	private boolean available;

	private LocalDateTime created;
	private LocalDateTime updated;

	public Long getHorseId() {
		return horseId;
	}

	public void setHorseId(Long horseId) {
		this.horseId = horseId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	@Override
	public String toString() {
		return "HorseDTO{" +
				"horseId=" + horseId +
				", name='" + name + '\'' +
				", image=" + Arrays.toString(image) +
				", available=" + available +
				", created=" + created +
				", updated=" + updated +
				'}';
	}

}
