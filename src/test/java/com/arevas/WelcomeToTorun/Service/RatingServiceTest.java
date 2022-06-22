package com.arevas.WelcomeToTorun.Service;

import com.arevas.WelcomeToTorun.domain.Article;
import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.domain.SportTeam;
import com.arevas.WelcomeToTorun.domain.TouristAttraction;
import com.arevas.WelcomeToTorun.exception.RatingNotFoundException;
import com.arevas.WelcomeToTorun.repository.ArticleRepository;
import com.arevas.WelcomeToTorun.repository.RatingRepository;
import com.arevas.WelcomeToTorun.repository.SportTeamRepository;
import com.arevas.WelcomeToTorun.repository.TouristAttractionRepository;
import com.arevas.WelcomeToTorun.service.RatingService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RatingServiceTest {

    @Mock
    private RatingRepository ratingRepository;

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private TouristAttractionRepository touristAttractionRepository;

    @Mock
    private SportTeamRepository sportTeamRepository;

    @InjectMocks
    private RatingService ratingService;

    @Test
    public void shouldCreateArticleNewRating() {
        Article article = new Article();
        article.setId(101L);
        article.setTitle("Test title");
        article.setBody("Test body");
        article.setCoverPhotoURL("Test URL");

        Rating rating = new Rating();
        rating.setId(101L);
        rating.setRating(BigDecimal.valueOf(10.0));
        rating.setDescription("Test description");

        List<Rating> ratingList = ratingRepository.findRatingByArticle(article.getId());
        ratingList.add(rating);
        article.setRatingList(ratingList);
        ratingRepository.setRatingToArticle(article.getId(), rating.getId());

        when(ratingRepository.save(ArgumentMatchers.any(Rating.class))).thenReturn(rating);
        given(articleRepository.findById(article.getId())).willReturn(Optional.of(article));
        Rating newRating = ratingService.createArticleNewRating(article.getId(), rating);

        assertThat(newRating.getRating()).isSameAs(rating.getRating());
        assertThat(newRating.getDescription()).isSameAs(rating.getDescription());
        verify(ratingRepository).save(rating);
    }

    @Test
    public void shouldCreateTouristAttractionNewRating() {
        TouristAttraction touristAttraction = new TouristAttraction();
        touristAttraction.setId(101L);
        touristAttraction.setName("Test name");
        touristAttraction.setDescription("Test description");
        touristAttraction.setCoverPhotoURL("Test URL");
        touristAttraction.setEstate("Test estate");
        touristAttraction.setStreet("Test street");

        Rating rating = new Rating();
        rating.setId(101L);
        rating.setRating(BigDecimal.valueOf(10.0));
        rating.setDescription("Test description");

        List<Rating> ratingList = ratingRepository.findRatingByTouristAttraction(touristAttraction.getId());
        ratingList.add(rating);
        touristAttraction.setRatingList(ratingList);
        ratingRepository.setRatingToArticle(touristAttraction.getId(), rating.getId());

        when(ratingRepository.save(ArgumentMatchers.any(Rating.class))).thenReturn(rating);
        given(touristAttractionRepository.findById(touristAttraction.getId())).willReturn(Optional.of(touristAttraction));
        Rating newRating = ratingService.createTouristAttractionNewRating(touristAttraction.getId(), rating);

        assertThat(newRating.getRating()).isSameAs(rating.getRating());
        assertThat(newRating.getDescription()).isSameAs(rating.getDescription());
        verify(ratingRepository).save(rating);
    }

    @Test
    public void shouldCreateSportTeamNewRating() {
        SportTeam sportTeam = new SportTeam();
        sportTeam.setId(101L);
        sportTeam.setName("Test name");
        sportTeam.setStreet("Test street");
        sportTeam.setStadium("Test stadium");
        sportTeam.setYearOfEstablishment(LocalDate.parse("2020-12-31"));
        sportTeam.setClubColors("Test colors");
        sportTeam.setDiscipline("Test discipline");
        sportTeam.setHistory("Test history");
        sportTeam.setCoverPhotoURL("Test URL");

        Rating rating = new Rating();
        rating.setId(101L);
        rating.setRating(BigDecimal.valueOf(10.0));
        rating.setDescription("Test description");

        List<Rating> ratingList = ratingRepository.findRatingBySportTeam(sportTeam.getId());
        ratingList.add(rating);
        sportTeam.setRatingList(ratingList);
        ratingRepository.setRatingToArticle(sportTeam.getId(), rating.getId());

        when(ratingRepository.save(ArgumentMatchers.any(Rating.class))).thenReturn(rating);
        given(sportTeamRepository.findById(sportTeam.getId())).willReturn(Optional.of(sportTeam));
        Rating newRating = ratingService.createSportTeamNewRating(sportTeam.getId(), rating);

        assertThat(newRating.getRating()).isSameAs(rating.getRating());
        assertThat(newRating.getDescription()).isSameAs(rating.getDescription());
        verify(ratingRepository).save(rating);
    }

    @Test
    public void shouldGetAllRating() {
        List<Rating> ratingList = new ArrayList<>();
        ratingList.add(new Rating());

        given(ratingRepository.findAll()).willReturn(ratingList);

        List<Rating> expectedRatingList = ratingService.getAllRating();

        assertEquals(expectedRatingList, ratingList);
        verify(ratingRepository).findAll();
    }

    @Test
    public void shouldRemoveRating() {
        Rating rating = new Rating();
        rating.setId(101L);
        rating.setRating(BigDecimal.valueOf(10.0));
        rating.setDescription("Test description");

        when(ratingRepository.findById(rating.getId())).thenReturn(Optional.of(rating));

        ratingService.removeRating(rating.getId());
        verify(ratingRepository).deleteById(rating.getId());
    }

    @Test
    public void shouldThrowRatingNotFoundException() {
        Rating rating = new Rating();
        rating.setId(101L);
        rating.setRating(BigDecimal.valueOf(10.0));
        rating.setDescription("Test description");

        assertThrows(RatingNotFoundException.class, () -> ratingService.removeRating(rating.getId()));
    }

    @Test
    public void shouldFindRatingById() {
        Rating rating = new Rating();
        rating.setId(101L);
        rating.setRating(BigDecimal.valueOf(10.0));
        rating.setDescription("Test description");

        when(ratingRepository.findById(rating.getId())).thenReturn(Optional.of(rating));

        Rating expectedRating = ratingService.findRatingById(rating.getId());
        assertEquals(expectedRating, rating);
        assertThat(expectedRating).isSameAs(rating);
        verify(ratingRepository).findById(rating.getId());
    }

    @Test
    public void shouldFindAllRatingByArticleId() {
        List<Rating> ratingList = new ArrayList<>();
        Rating articleRating1 = new Rating();
        Rating articleRating2 = new Rating();
        ratingList.add(articleRating1);
        ratingList.add(articleRating2);

        Article article = new Article();
        article.setId(101L);
        article.setTitle("Test title");
        article.setBody("Test body");
        article.setCoverPhotoURL("Test URL");
        article.setRatingList(ratingList);

        given(ratingRepository.findRatingByArticle(article.getId())).willReturn(ratingList);

        List<Rating> expectedRatingList = ratingService.getAllRatingByArticleId(article.getId());

        assertEquals(expectedRatingList, ratingList);
        verify(ratingRepository).findRatingByArticle(article.getId());
    }

    @Test
    public void shouldFindAllRatingBySportTeamId() {
        List<Rating> ratingList = new ArrayList<>();
        Rating sportTeamRating1 = new Rating();
        Rating sportTeamRating2 = new Rating();
        ratingList.add(sportTeamRating1);
        ratingList.add(sportTeamRating2);

        SportTeam sportTeam = new SportTeam();
        sportTeam.setId(101L);
        sportTeam.setName("Test name");
        sportTeam.setStreet("Test street");
        sportTeam.setStadium("Test stadium");
        sportTeam.setYearOfEstablishment(LocalDate.parse("2020-12-31"));
        sportTeam.setClubColors("Test colors");
        sportTeam.setDiscipline("Test discipline");
        sportTeam.setHistory("Test history");
        sportTeam.setCoverPhotoURL("Test URL");
        sportTeam.setRatingList(ratingList);

        given(ratingRepository.findRatingBySportTeam(sportTeam.getId())).willReturn(ratingList);

        List<Rating> expectedRatingList = ratingService.getAllRatingBySportTeamId(sportTeam.getId());

        assertEquals(expectedRatingList, ratingList);
        verify(ratingRepository).findRatingBySportTeam(sportTeam.getId());
    }

    @Test
    public void shouldFindAllRatingByTouristAttractionId() {
        List<Rating> ratingList = new ArrayList<>();
        Rating touristAttractionRating1 = new Rating();
        Rating touristAttractionRating2 = new Rating();
        ratingList.add(touristAttractionRating1);
        ratingList.add(touristAttractionRating2);

        TouristAttraction touristAttraction = new TouristAttraction();
        touristAttraction.setId(101L);
        touristAttraction.setName("Test name");
        touristAttraction.setDescription("Test description");
        touristAttraction.setCoverPhotoURL("Test URL");
        touristAttraction.setEstate("Test estate");
        touristAttraction.setStreet("Test street");
        touristAttraction.setRatingList(ratingList);

        given(ratingRepository.findRatingByTouristAttraction(touristAttraction.getId())).willReturn(ratingList);

        List<Rating> expectedRatingList = ratingService.getAllRatingByTouristAttractionId(touristAttraction.getId());

        assertEquals(expectedRatingList, ratingList);
        verify(ratingRepository).findRatingByTouristAttraction(touristAttraction.getId());
    }
}
