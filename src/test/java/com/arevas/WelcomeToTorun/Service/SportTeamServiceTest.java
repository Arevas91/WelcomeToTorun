package com.arevas.WelcomeToTorun.Service;

import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.domain.SportTeam;
import com.arevas.WelcomeToTorun.exception.SportTeamNotFoundException;
import com.arevas.WelcomeToTorun.repository.RatingRepository;
import com.arevas.WelcomeToTorun.repository.SportTeamRepository;
import com.arevas.WelcomeToTorun.service.SportTeamService;
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
public class SportTeamServiceTest {

    @Mock
    private SportTeamRepository sportTeamRepository;

    @Mock
    private RatingRepository ratingRepository;

    @InjectMocks
    private SportTeamService sportTeamService;

    @Test
    public void shouldCreateNewSportTeam() {
        SportTeam sportTeam = new SportTeam();
        sportTeam.setName("Test name");
        sportTeam.setStreet("Test street");
        sportTeam.setStadium("Test stadium");
        sportTeam.setYearOfEstablishment(LocalDate.parse("2020-12-31"));
        sportTeam.setClubColors("Test colors");
        sportTeam.setDiscipline("Test discipline");
        sportTeam.setHistory("Test history");
        sportTeam.setCoverPhotoURL("Test URL");

        when(sportTeamRepository.save(ArgumentMatchers.any(SportTeam.class))).thenReturn(sportTeam);
        SportTeam newSportTeam = sportTeamService.createNewSportTeam(sportTeam);

        assertThat(newSportTeam.getName()).isSameAs(sportTeam.getName());
        assertThat(newSportTeam.getStreet()).isSameAs(sportTeam.getStreet());
        assertThat(newSportTeam.getStadium()).isSameAs(sportTeam.getStadium());
        assertThat(newSportTeam.getYearOfEstablishment()).isSameAs(sportTeam.getYearOfEstablishment());
        assertThat(newSportTeam.getClubColors()).isSameAs(sportTeam.getClubColors());
        assertThat(newSportTeam.getDiscipline()).isSameAs(sportTeam.getDiscipline());
        assertThat(newSportTeam.getHistory()).isSameAs(sportTeam.getHistory());
        assertThat(newSportTeam.getCoverPhotoURL()).isSameAs(sportTeam.getCoverPhotoURL());
        verify(sportTeamRepository).save(sportTeam);
    }

    @Test
    public void shouldGetAllSportTeam() {
        List<SportTeam> sportTeamList = new ArrayList<>();
        sportTeamList.add(new SportTeam());

        given(sportTeamRepository.findAll()).willReturn(sportTeamList);

        List<SportTeam> expectedSportTeamList = sportTeamService.getAllSportTeam();

        assertEquals(expectedSportTeamList, sportTeamList);
        verify(sportTeamRepository).findAll();
    }

    @Test
    public void shouldRemoveSportTeam() {
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
        ratingRepository.save(rating);

        List<Rating> ratingList = ratingRepository.findRatingBySportTeam(sportTeam.getId());
        ratingList.add(rating);
        sportTeam.setRatingList(ratingList);
        ratingRepository.setRatingToArticle(sportTeam.getId(), rating.getId());

        when(sportTeamRepository.findById(sportTeam.getId())).thenReturn(Optional.of(sportTeam));

        sportTeamService.removeSportTeam(sportTeam.getId());
        verify(sportTeamRepository).deleteById(sportTeam.getId());
    }

    @Test
    public void shouldThrowSportTeamNotFoundException() {
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

        assertThrows(SportTeamNotFoundException.class, () -> sportTeamService.removeSportTeam(sportTeam.getId()));
    }

    @Test
    public void shouldFindSportTeamById() {
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

        when(sportTeamRepository.findById(sportTeam.getId())).thenReturn(Optional.of(sportTeam));

        SportTeam expectedSportTeam = sportTeamService.findSportTeamById(sportTeam.getId());
        assertEquals(expectedSportTeam, sportTeam);
        assertThat(expectedSportTeam).isSameAs(sportTeam);
        verify(sportTeamRepository).findById(sportTeam.getId());
    }
}
