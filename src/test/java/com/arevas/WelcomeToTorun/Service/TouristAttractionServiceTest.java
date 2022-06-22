package com.arevas.WelcomeToTorun.Service;

import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.domain.TouristAttraction;
import com.arevas.WelcomeToTorun.exception.TouristAttractionNotFoundException;
import com.arevas.WelcomeToTorun.repository.RatingRepository;
import com.arevas.WelcomeToTorun.repository.TouristAttractionRepository;
import com.arevas.WelcomeToTorun.service.TouristAttractionService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
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
class TouristAttractionServiceTest {

    @Mock
    private TouristAttractionRepository touristAttractionRepository;

    @Mock
    private RatingRepository ratingRepository;

    @InjectMocks
    private TouristAttractionService touristAttractionService;

    @Test
    public void shouldCreateNewTouristAttraction() {
        TouristAttraction touristAttraction = new TouristAttraction();
        touristAttraction.setName("Test name");
        touristAttraction.setDescription("Test description");
        touristAttraction.setCoverPhotoURL("Test URL");
        touristAttraction.setEstate("Test estate");
        touristAttraction.setStreet("Test street");

        when(touristAttractionRepository.save(ArgumentMatchers.any(TouristAttraction.class))).thenReturn(touristAttraction);
        TouristAttraction newTouristAttraction = touristAttractionService.createNewTouristAttraction(touristAttraction);

        assertThat(newTouristAttraction.getName()).isSameAs(touristAttraction.getName());
        assertThat(newTouristAttraction.getDescription()).isSameAs(touristAttraction.getDescription());
        assertThat(newTouristAttraction.getCoverPhotoURL()).isSameAs(touristAttraction.getCoverPhotoURL());
        assertThat(newTouristAttraction.getEstate()).isSameAs(touristAttraction.getEstate());
        assertThat(newTouristAttraction.getStreet()).isSameAs(touristAttraction.getStreet());
        verify(touristAttractionRepository).save(touristAttraction);
    }

    @Test
    public void shouldGetAllTouristAttraction() {
        List<TouristAttraction> touristAttractionList = new ArrayList<>();
        touristAttractionList.add(new TouristAttraction());

        given(touristAttractionRepository.findAll()).willReturn(touristAttractionList);

        List<TouristAttraction> expectedTouristAttractionList = touristAttractionService.getAllTouristAttraction();

        assertEquals(expectedTouristAttractionList, touristAttractionList);
        verify(touristAttractionRepository).findAll();
    }

    @Test
    public void shouldRemoveTouristAttraction() {
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
        ratingRepository.save(rating);

        List<Rating> ratingList = ratingRepository.findRatingByTouristAttraction(touristAttraction.getId());
        ratingList.add(rating);
        touristAttraction.setRatingList(ratingList);
        ratingRepository.setRatingToArticle(touristAttraction.getId(), rating.getId());

        when(touristAttractionRepository.findById(touristAttraction.getId())).thenReturn(Optional.of(touristAttraction));

        touristAttractionService.removeTouristAttraction(touristAttraction.getId());
        verify(touristAttractionRepository).deleteById(touristAttraction.getId());
    }

    @Test
    public void shouldThrowTouristAttractionNotFoundException() {
        TouristAttraction touristAttraction = new TouristAttraction();
        touristAttraction.setId(101L);
        touristAttraction.setName("Test name");
        touristAttraction.setDescription("Test description");
        touristAttraction.setCoverPhotoURL("Test URL");
        touristAttraction.setEstate("Test estate");
        touristAttraction.setStreet("Test street");

        assertThrows(TouristAttractionNotFoundException.class, () -> touristAttractionService.removeTouristAttraction(touristAttraction.getId()));
    }

    @Test
    public void shouldFindTouristAttractionById() {
        TouristAttraction touristAttraction = new TouristAttraction();
        touristAttraction.setId(101L);
        touristAttraction.setName("Test name");
        touristAttraction.setDescription("Test description");
        touristAttraction.setCoverPhotoURL("Test URL");
        touristAttraction.setEstate("Test estate");
        touristAttraction.setStreet("Test street");

        when(touristAttractionRepository.findById(touristAttraction.getId())).thenReturn(Optional.of(touristAttraction));

        TouristAttraction expectedTouristAttraction = touristAttractionService.findTouristAttractionById(touristAttraction.getId());
        assertEquals(expectedTouristAttraction, touristAttraction);
        assertThat(expectedTouristAttraction).isSameAs(touristAttraction);
        verify(touristAttractionRepository).findById(touristAttraction.getId());
    }

}
