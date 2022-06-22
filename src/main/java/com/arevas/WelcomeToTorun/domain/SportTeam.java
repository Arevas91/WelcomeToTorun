package com.arevas.WelcomeToTorun.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "team")
public class SportTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 5)
    @Column(length = 150, unique = true, nullable = false)
    private String name;

    @Size(min = 3)
    @Column(length = 150, nullable = false)
    private String street;

    @Size(min = 5)
    @Column(length = 150, nullable = false)
    private String stadium;

    @DateTimeFormat(pattern = "yyyy")
    @Column(nullable = false)
    private LocalDate yearOfEstablishment;

    @Size(min = 3)
    @Column(nullable = false)
    private String clubColors;

    @Size(min = 3)
    @Column(length = 150, nullable = false)
    private String discipline;

    @Size(min = 10)
    @Column(length = 1000, nullable = false, columnDefinition = "Text")
    private String history;

    @Column(nullable = false)
    private String coverPhotoURL;

    @OneToMany(mappedBy = "sportTeam")
    private List<Rating> ratingList = new ArrayList<>();

    public SportTeam() {
    }

    public SportTeam(String name, String street, String stadium, LocalDate yearOfEstablishment, String clubColors, String discipline, String history, String coverPhotoURL) {
        this.name = name;
        this.street = street;
        this.stadium = stadium;
        this.yearOfEstablishment = yearOfEstablishment;
        this.clubColors = clubColors;
        this.discipline = discipline;
        this.history = history;
        this.coverPhotoURL = coverPhotoURL;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getStadium() {
        return stadium;
    }

    public void setStadium(String stadium) {
        this.stadium = stadium;
    }

    public LocalDate getYearOfEstablishment() {
        return yearOfEstablishment;
    }

    public void setYearOfEstablishment(LocalDate yearOfEstablishment) {
        this.yearOfEstablishment = yearOfEstablishment;
    }

    public String getClubColors() {
        return clubColors;
    }

    public void setClubColors(String clubColors) {
        this.clubColors = clubColors;
    }

    public String getDiscipline() {
        return discipline;
    }

    public void setDiscipline(String discipline) {
        this.discipline = discipline;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public String getCoverPhotoURL() {
        return coverPhotoURL;
    }

    public void setCoverPhotoURL(String coverPhotoURL) {
        this.coverPhotoURL = coverPhotoURL;
    }

    public List<Rating> getRatingList() {
        return ratingList;
    }

    public void setRatingList(List<Rating> ratingList) {
        this.ratingList = ratingList;
    }

    @Override
    public String toString() {
        return String.format("Sport Team - name: %s, stadium: %s, street: %s, year of establishment: %s, club colors: %s, discipline: %s", name, stadium, street, yearOfEstablishment, clubColors, discipline);
    }
}
