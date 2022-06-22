package com.arevas.WelcomeToTorun.domain;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "article")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 10)
    @Column(length = 150, unique = true, nullable = false)
    private String title;

    @Size(min = 10)
    @Column(length = 1000, nullable = false, columnDefinition = "Text")
    private String body;

    @Column(nullable = false)
    private String coverPhotoURL;

    @OneToMany(mappedBy = "article")
    private List<Rating> ratingList = new ArrayList<>();

    public Article() {
    }

    public Article(String title, String body, String coverPhotoURL) {
        this.title = title;
        this.body = body;
        this.coverPhotoURL = coverPhotoURL;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
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
        return "Article - " + title + ", body: " + body;
    }
}
