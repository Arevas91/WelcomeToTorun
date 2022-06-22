package com.arevas.WelcomeToTorun.domain;

import javax.persistence.*;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import java.math.BigDecimal;

@Entity
@Table(name = "rating")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ratingId;

    @Column(scale = 2, precision = 4)
    @DecimalMin(value = "1.0")
    @DecimalMax(value = "10.0")
    private BigDecimal rating;

    @Column(length = 1000, nullable = false, columnDefinition = "Text")
    private String description;

    @ManyToOne
    private Article article;

    @ManyToOne
    private TouristAttraction touristAttraction;

    @ManyToOne
    private SportTeam sportTeam;

    public Rating() {
    }

    public Rating(BigDecimal rating, String description) {
        this.rating = rating;
        this.description = description;
    }

    public Long getId() {
        return ratingId;
    }

    public void setId(Long id) {
        this.ratingId = id;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Ocena: " + rating + "\n" + "Treść: " + description;
    }
}
