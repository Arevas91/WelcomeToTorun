package com.arevas.WelcomeToTorun.repository;

import com.arevas.WelcomeToTorun.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
}
