package com.arevas.WelcomeToTorun.service;

import com.arevas.WelcomeToTorun.domain.Article;
import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.exception.ArticleNotFoundException;
import com.arevas.WelcomeToTorun.repository.ArticleRepository;
import com.arevas.WelcomeToTorun.repository.RatingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final RatingRepository ratingRepository;

    public ArticleService(ArticleRepository articleRepository, RatingRepository ratingRepository) {
        this.articleRepository = articleRepository;
        this.ratingRepository = ratingRepository;
    }

    public Article createNewArticle(Article article) {
        return articleRepository.save(article);
    }

    public List<Article> getAllArticle() {
        return articleRepository.findAll();
    }

    @Transactional
    public void removeArticle(Long id) {
        articleRepository.findById(id).orElseThrow(() -> new ArticleNotFoundException(id));
        List<Rating> ratingList = ratingRepository.findRatingByArticle(id);
        for (Rating rating : ratingList ) {
            ratingRepository.deleteById(rating.getId());
        }
        articleRepository.deleteById(id);
    }

    public void updateArticle(Long id, Article article) {
        Article existingArticle = articleRepository.findById(id).orElseThrow(() -> new ArticleNotFoundException(id));

        if (existingArticle != null) {
            article.setId(existingArticle.getId());
            articleRepository.save(article);
        } else {
            articleRepository.save(article);
        }
    }

    public Article findArticleById(Long id) {
        return articleRepository.findById(id).orElseThrow(() -> new ArticleNotFoundException(id));
    }
}
