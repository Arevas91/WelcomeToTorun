package com.arevas.WelcomeToTorun.service;

import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.domain.SportTeam;
import com.arevas.WelcomeToTorun.exception.SportTeamNotFoundException;
import com.arevas.WelcomeToTorun.repository.RatingRepository;
import com.arevas.WelcomeToTorun.repository.SportTeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SportTeamService {

    private final SportTeamRepository sportTeamRepository;
    private final RatingRepository ratingRepository;

    public SportTeamService(SportTeamRepository sportTeamRepository, RatingRepository ratingRepository) {
        this.sportTeamRepository = sportTeamRepository;
        this.ratingRepository = ratingRepository;
    }

    public SportTeam createNewSportTeam(SportTeam sportTeam) {
        return sportTeamRepository.save(sportTeam);
    }

    public List<SportTeam> getAllSportTeam() {
        return sportTeamRepository.findAll();
    }

    @Transactional
    public void removeSportTeam(Long id) {
        sportTeamRepository.findById(id).orElseThrow(() -> new SportTeamNotFoundException(id));
        List<Rating> ratingList = ratingRepository.findRatingBySportTeam(id);
        for (Rating rating : ratingList ) {
            ratingRepository.deleteById(rating.getId());
        }
        sportTeamRepository.deleteById(id);
    }

    public void updateSportTeam(Long id, SportTeam sportTeam) {
        SportTeam existingSportTeam = sportTeamRepository.findById(id).orElseThrow(() -> new SportTeamNotFoundException(id));

        if (existingSportTeam != null) {
            sportTeam.setId(existingSportTeam.getId());
            sportTeamRepository.save(sportTeam);
        } else {
            sportTeamRepository.save(sportTeam);
        }
    }

    public SportTeam findSportTeamById(Long id) {
        return sportTeamRepository.findById(id).orElseThrow(() -> new SportTeamNotFoundException(id));
    }
}
