package com.arevas.WelcomeToTorun.domain;

import javax.persistence.*;

@Entity
@Table(name = "role")
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private RoleUtils name;

	public Role() {
	}

	public Role(RoleUtils name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public RoleUtils getName() {
		return name;
	}

	public void setName(RoleUtils name) {
		this.name = name;
	}
}