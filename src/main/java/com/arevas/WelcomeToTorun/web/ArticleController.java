package com.arevas.WelcomeToTorun.web;

import com.arevas.WelcomeToTorun.domain.Article;
import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.service.ArticleService;
import com.arevas.WelcomeToTorun.service.PdfReportService;
import com.arevas.WelcomeToTorun.service.RatingService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/auth/article/")
@CrossOrigin("http://localhost:3000")
public class ArticleController {

    private final ArticleService articleService;
    private final RatingService ratingService;

    public ArticleController(ArticleService articleService, RatingService ratingService) {
        this.articleService = articleService;
        this.ratingService = ratingService;
    }

    @GetMapping("list")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Article> getAllArticle() {
        return articleService.getAllArticle();
    }

    @GetMapping("list/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Article getTouristArticleById(@PathVariable Long id) {
        return articleService.findArticleById(id);
    }

    @PostMapping("add")
    @PreAuthorize("hasRole('ADMIN')")
    public void createArticle(@Valid @RequestBody Article article) {
        articleService.createNewArticle(article);
    }

    @DeleteMapping("list/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteArticle(@PathVariable Long id) {
        articleService.removeArticle(id);
    }

    @PutMapping("list/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void putArticle(@PathVariable Long id, @RequestBody Article article) {
        articleService.updateArticle(id, article);
    }

    @RequestMapping(value = "pdf/report/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<InputStreamResource> reports(@PathVariable Long id) {
        Article article = articleService.findArticleById(id);
        double averageRating = ratingService.getAverageRatingByArticleId(article.getId());
        List<Rating> articleList = ratingService.getAllRatingByArticleId(article.getId());
        ByteArrayInputStream bis = PdfReportService.singleArticleReport(article, averageRating, articleList);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=file.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
