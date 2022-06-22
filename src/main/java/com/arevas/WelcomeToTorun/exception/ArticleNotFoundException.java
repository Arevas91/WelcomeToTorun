package com.arevas.WelcomeToTorun.exception;

public class ArticleNotFoundException extends RuntimeException {

    public ArticleNotFoundException(Long id) {
        super("Nie znaleziono artykułu o id: " + id + ".");
    }
}
