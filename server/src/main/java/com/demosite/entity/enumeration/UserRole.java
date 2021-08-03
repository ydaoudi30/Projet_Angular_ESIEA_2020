package com.demosite.entity.enumeration;

import java.io.Serializable;

public enum UserRole implements Serializable {

	ADMIN,
    PUBLIC,
	INSTRUCTOR;
	public String getUserRole() {
        return this.name();
    }
}
