package com.arevas.WelcomeToTorun.service;

import com.arevas.WelcomeToTorun.domain.Article;
import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.domain.SportTeam;
import com.arevas.WelcomeToTorun.domain.TouristAttraction;
import com.arevas.WelcomeToTorun.exception.ArticleNotFoundException;
import com.arevas.WelcomeToTorun.exception.RatingNotFoundException;
import com.arevas.WelcomeToTorun.exception.SportTeamNotFoundException;
import com.arevas.WelcomeToTorun.exception.TouristAttractionNotFoundException;
import com.arevas.WelcomeToTorun.repository.ArticleRepository;
import com.arevas.WelcomeToTorun.repository.RatingRepository;
import com.arevas.WelcomeToTorun.repository.SportTeamRepository;
import com.arevas.WelcomeToTorun.repository.TouristAttractionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;
    private final ArticleRepository articleRepository;
    private final TouristAttractionRepository touristAttractionRepository;
    private final SportTeamRepository sportTeamRepository;

    public RatingService(RatingRepository ratingRepository, ArticleRepository articleRepository, TouristAttractionRepository touristAttractionRepository, SportTeamRepository sportTeamRepository) {
        this.ratingRepository = ratingRepository;
        this.articleRepository = articleRepository;
        this.touristAttractionRepository = touristAttractionRepository;
        this.sportTeamRepository = sportTeamRepository;
    }

    @Transactional
    public Rating createArticleNewRating(Long id, Rating rating) {
        List<Rating> list = ratingRepository.findRatingByArticle(id);
        Rating newRating = ratingRepository.save(rating);
        list.add(newRating);
        Article article = articleRepository.findById(id).orElseThrow(() -> new ArticleNotFoundException(id));
        article.setRatingList(list);
        ratingRepository.setRatingToArticle(id, newRating.getId());
        return newRating;
    }

    @Transactional
    public Rating createTouristAttractionNewRating(Long id, Rating rating) {
        List<Rating> list = ratingRepository.findRatingByTouristAttraction(id);
        Rating newRating = ratingRepository.save(rating);
        list.add(newRating);
        TouristAttraction touristAttraction = touristAttractionRepository.findById(id).orElseThrow(() -> new TouristAttractionNotFoundException(id));
        touristAttraction.setRatingList(list);
        ratingRepository.setRatingToTouristAttraction(id, newRating.getId());
        return newRating;
    }

    @Transactional
    public Rating createSportTeamNewRating(Long id, Rating rating) {
        List<Rating> list = ratingRepository.findRatingBySportTeam(id);
        Rating newRating = ratingRepository.save(rating);
        list.add(newRating);
        SportTeam sportTeam = sportTeamRepository.findById(id).orElseThrow(() -> new SportTeamNotFoundException(id));
        sportTeam.setRatingList(list);
        ratingRepository.setRatingToSportTeam(id, newRating.getId());
        return newRating;
    }

    public List<Rating> getAllRating() {
        return ratingRepository.findAll();
    }

    public void removeRating(Long id) {
        ratingRepository.findById(id).orElseThrow(() -> new RatingNotFoundException(id));
        ratingRepository.deleteById(id);
    }

    public void updateRating(Long id, Rating rating) {
        Rating existingRating = ratingRepository.findById(id).orElseThrow(() -> new RatingNotFoundException(id));

        if (existingRating != null) {
            rating.setId(existingRating.getId());
            ratingRepository.save(rating);
        } else {
            ratingRepository.save(rating);
        }
    }

    public Rating findRatingById(Long id) {
        return ratingRepository.findById(id).orElseThrow(() -> new RatingNotFoundException(id));
    }

    public List<Rating> getAllRatingByArticleId(Long id) {
        return ratingRepository.findRatingByArticle(id);
    }

    public List<Rating> getAllRatingByTouristAttractionId(Long id) {
        return ratingRepository.findRatingByTouristAttraction(id);
    }

    public List<Rating> getAllRatingBySportTeamId(Long id) {
        return ratingRepository.findRatingBySportTeam(id);
    }

    public Double getAverageRatingByArticleId(Long id) {
        List<Rating> list = ratingRepository.findRatingByArticle(id);
        double sum = 0.0;
        for (Rating rating : list) {
            sum += Double.parseDouble(String.valueOf(rating.getRating()));
        }
        return sum / list.size();
    }

    public Double getAverageRatingByTouristAttractionId(Long id) {
        List<Rating> list = ratingRepository.findRatingByTouristAttraction(id);
        double sum = 0.0;
        for (Rating rating : list) {
            sum += Double.parseDouble(String.valueOf(rating.getRating()));
        }
        return sum / list.size();
    }

    public Double getAverageRatingBySportTeamId(Long id) {
        List<Rating> list = ratingRepository.findRatingBySportTeam(id);
        double sum = 0.0;
        for (Rating rating : list) {
            sum += Double.parseDouble(String.valueOf(rating.getRating()));
        }
        return sum / list.size();
    }
}
