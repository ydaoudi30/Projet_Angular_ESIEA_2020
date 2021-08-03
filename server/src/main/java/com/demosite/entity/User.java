package com.demosite.entity;


import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;

import com.demosite.entity.enumeration.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.demosite.utils.Constants;

@Entity
@Table(name = Constants.TABLE_USERS)
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long userId;
	private String firstName;
	private String lastName;
	private String userName;
	private String email;
	private String phone;

	@JsonIgnore
	private String password;
	
	private LocalDateTime created;
	private LocalDateTime updated;

	@Enumerated(EnumType.STRING)
    private UserRole role;

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

	public Long getUserId() {
		return userId;
	}
	
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPhone() {
		return phone;
	}
	
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName + ", userName=" + userName + ", email=" + email + ", phone=" + phone
                + ", role=" + role + ", password=" + password + ", created=" + created + ", updated=" + updated
				+ "]";
	}
	
}
