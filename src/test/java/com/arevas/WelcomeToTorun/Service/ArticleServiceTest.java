package com.arevas.WelcomeToTorun.Service;

import com.arevas.WelcomeToTorun.domain.Article;
import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.exception.ArticleNotFoundException;
import com.arevas.WelcomeToTorun.repository.ArticleRepository;
import com.arevas.WelcomeToTorun.repository.RatingRepository;
import com.arevas.WelcomeToTorun.service.ArticleService;
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
public class ArticleServiceTest {

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private RatingRepository ratingRepository;

    @InjectMocks
    private ArticleService articleService;

    @Test
    public void shouldCreateNewArticle() {
        Article article = new Article();
        article.setTitle("Test title");
        article.setBody("Test body");
        article.setCoverPhotoURL("Test URL");

        when(articleRepository.save(ArgumentMatchers.any(Article.class))).thenReturn(article);
        Article newArticle = articleService.createNewArticle(article);

        assertThat(newArticle.getTitle()).isSameAs(article.getTitle());
        assertThat(newArticle.getBody()).isSameAs(article.getBody());
        assertThat(newArticle.getCoverPhotoURL()).isSameAs(article.getCoverPhotoURL());
        verify(articleRepository).save(article);
    }

    @Test
    public void shouldGetAllArticle() {
        List<Article> articleList = new ArrayList<>();
        articleList.add(new Article());

        given(articleRepository.findAll()).willReturn(articleList);

        List<Article> expectedArticleList = articleService.getAllArticle();

        assertEquals(expectedArticleList, articleList);
        verify(articleRepository).findAll();
    }

    @Test
    public void shouldRemoveArticle() {
        Article article = new Article();
        article.setId(101L);
        article.setTitle("Test title");
        article.setBody("Test body");
        article.setCoverPhotoURL("Test URL");

        Rating rating = new Rating();
        rating.setId(101L);
        rating.setRating(BigDecimal.valueOf(10.0));
        rating.setDescription("Test description");
        ratingRepository.save(rating);

        List<Rating> ratingList = ratingRepository.findRatingByArticle(article.getId());
        ratingList.add(rating);
        article.setRatingList(ratingList);
        ratingRepository.setRatingToArticle(article.getId(), rating.getId());

        when(articleRepository.findById(article.getId())).thenReturn(Optional.of(article));

        articleService.removeArticle(article.getId());
        verify(articleRepository).deleteById(article.getId());
    }

    @Test
    public void shouldThrowRatingNotFoundException() {
        Article article = new Article();
        article.setTitle("Test title");
        article.setBody("Test body");
        article.setCoverPhotoURL("Test URL");

        assertThrows(ArticleNotFoundException.class, () -> articleService.removeArticle(article.getId()));
    }

    @Test
    public void shouldFindArticleById() {
        Article article = new Article();
        article.setTitle("Test title");
        article.setBody("Test body");
        article.setCoverPhotoURL("Test URL");

        when(articleRepository.findById(article.getId())).thenReturn(Optional.of(article));

        Article expectedArticle = articleService.findArticleById(article.getId());
        assertEquals(expectedArticle, article);
        assertThat(expectedArticle).isSameAs(article);
        verify(articleRepository).findById(article.getId());
    }
}
