package com.arevas.WelcomeToTorun.service;

import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.domain.TouristAttraction;
import com.arevas.WelcomeToTorun.exception.TouristAttractionNotFoundException;
import com.arevas.WelcomeToTorun.repository.RatingRepository;
import com.arevas.WelcomeToTorun.repository.TouristAttractionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TouristAttractionService {

    private final TouristAttractionRepository touristAttractionRepository;
    private final RatingRepository ratingRepository;

    public TouristAttractionService(TouristAttractionRepository touristAttractionRepository, RatingRepository ratingRepository) {
        this.touristAttractionRepository = touristAttractionRepository;
        this.ratingRepository = ratingRepository;
    }

    public TouristAttraction createNewTouristAttraction(TouristAttraction touristAttraction) {
        return touristAttractionRepository.save(touristAttraction);
    }

    public List<TouristAttraction> getAllTouristAttraction() {
        return touristAttractionRepository.findAll();
    }

    @Transactional
    public void removeTouristAttraction(Long id) {
        touristAttractionRepository.findById(id).orElseThrow(() -> new TouristAttractionNotFoundException(id));
        List<Rating> ratingList = ratingRepository.findRatingByTouristAttraction(id);
        for (Rating rating : ratingList ) {
            ratingRepository.deleteById(rating.getId());
        }
        touristAttractionRepository.deleteById(id);
    }

    public void updateTouristAttraction(Long id, TouristAttraction touristAttraction) {
        TouristAttraction existingTouristAttraction = touristAttractionRepository.findById(id).orElseThrow(() -> new TouristAttractionNotFoundException(id));

        if (existingTouristAttraction != null) {
            touristAttraction.setId(existingTouristAttraction.getId());
            touristAttractionRepository.save(touristAttraction);
        } else {
            touristAttractionRepository.save(touristAttraction);
        }
    }

    public TouristAttraction findTouristAttractionById(Long id) {
        return touristAttractionRepository.findById(id).orElseThrow(() -> new TouristAttractionNotFoundException(id));
    }

}
