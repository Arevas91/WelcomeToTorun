package com.arevas.WelcomeToTorun.repository;

import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.domain.SportTeam;
import com.arevas.WelcomeToTorun.domain.TouristAttraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    @Query("FROM Rating where article.id = :id")
    List<Rating> findRatingByArticle(@Param("id") Long id);

    @Query("FROM Rating where touristAttraction.id = :id")
    List<Rating> findRatingByTouristAttraction(@Param("id") Long id);

    @Query("FROM Rating where sportTeam.id = :id")
    List<Rating> findRatingBySportTeam(@Param("id") Long id);

    @Modifying
    @Query("UPDATE Rating SET article.id = :articleID where ratingId = :ratingID")
    void setRatingToArticle(@Param("articleID") Long articleID, @Param("ratingID") Long ratingID);

    @Modifying
    @Query("UPDATE Rating SET touristAttraction.id = :touristAttractionID where ratingId = :ratingID")
    void setRatingToTouristAttraction(@Param("touristAttractionID") Long touristAttractionID, @Param("ratingID") Long ratingID);

    @Modifying
    @Query("UPDATE Rating SET sportTeam.id = :sportTeamID where ratingId = :ratingID")
    void setRatingToSportTeam(@Param("sportTeamID") Long sportTeamID, @Param("ratingID") Long ratingID);
}
