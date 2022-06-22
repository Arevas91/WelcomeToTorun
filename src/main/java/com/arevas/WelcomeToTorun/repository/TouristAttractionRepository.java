package com.arevas.WelcomeToTorun.repository;

import com.arevas.WelcomeToTorun.domain.TouristAttraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TouristAttractionRepository extends JpaRepository<TouristAttraction, Long> {
}
