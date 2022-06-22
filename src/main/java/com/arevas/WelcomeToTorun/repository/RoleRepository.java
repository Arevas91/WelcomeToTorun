package com.arevas.WelcomeToTorun.repository;

import com.arevas.WelcomeToTorun.domain.Role;
import com.arevas.WelcomeToTorun.domain.RoleUtils;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleUtils name);
}
