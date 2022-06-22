package com.arevas.WelcomeToTorun.repository;

import com.arevas.WelcomeToTorun.domain.SportTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SportTeamRepository extends JpaRepository<SportTeam, Long> {
}
