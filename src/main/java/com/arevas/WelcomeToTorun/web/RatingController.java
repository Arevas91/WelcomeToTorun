package com.arevas.WelcomeToTorun.web;

import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.service.RatingService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/auth/rating/")
@CrossOrigin("http://localhost:3000")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping("list/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Rating getRatingById(@PathVariable Long id) {
        return ratingService.findRatingById(id);
    }

    @GetMapping("list/article/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Rating> getRatingsByArticleId(@PathVariable Long id) {
        return ratingService.getAllRatingByArticleId(id);
    }

    @GetMapping("list/average-rating/article/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Double getAverageRatingByArticleId(@PathVariable Long id) {
        return ratingService.getAverageRatingByArticleId(id);
    }

    @PostMapping("add/list/article/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void createArticleRating(@Valid @RequestBody Rating rating, @PathVariable Long id) {
        ratingService.createArticleNewRating(id, rating);
    }

    @GetMapping("list/tourist-attraction/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Rating> getRatingsByTouristAttractionId(@PathVariable Long id) {
        return ratingService.getAllRatingByTouristAttractionId(id);
    }

    @GetMapping("list/average-rating/tourist-attraction/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Double getAverageRatingByTouristAttractionId(@PathVariable Long id) {
        return ratingService.getAverageRatingByTouristAttractionId(id);
    }

    @PostMapping("add/list/tourist-attraction/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void createTouristAttractionRating(@Valid @RequestBody Rating rating, @PathVariable Long id) {
        ratingService.createTouristAttractionNewRating(id, rating);
    }

    @GetMapping("list/sport-team/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Rating> getRatingsBySportTeamId(@PathVariable Long id) {
        return ratingService.getAllRatingBySportTeamId(id);
    }

    @GetMapping("list/average-rating/sport-team/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Double getAverageRatingBySportTeamId(@PathVariable Long id) {
        return ratingService.getAverageRatingBySportTeamId(id);
    }

    @PostMapping("add/list/sport-team/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void createSportTeamRating(@Valid @RequestBody Rating rating, @PathVariable Long id) {
        ratingService.createSportTeamNewRating(id, rating);
    }
}
