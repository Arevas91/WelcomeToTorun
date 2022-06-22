package com.arevas.WelcomeToTorun.domain;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "attraction")
public class TouristAttraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 5)
    @Column(length = 150, unique = true, nullable = false)
    private String name;

    @Size(min = 3)
    @Column(length = 150, nullable = false)
    private String estate;

    @Size(min = 3)
    @Column(length = 150, nullable = false)
    private String street;

    @Size(min = 10)
    @Column(length = 1000, nullable = false, columnDefinition = "Text")
    private String description;

    @Column(nullable = false)
    private String coverPhotoURL;

    @OneToMany(mappedBy = "touristAttraction")
    private List<Rating> ratingList = new ArrayList<>();

    public TouristAttraction() {
    }

    public TouristAttraction(String name, String estate, String street, String description, String coverPhotoURL) {
        this.name = name;
        this.estate = estate;
        this.street = street;
        this.description = description;
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

    public String getEstate() {
        return estate;
    }

    public void setEstate(String estate) {
        this.estate = estate;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
        return "Attraction - " + name + ", description: " + description;
    }
}
