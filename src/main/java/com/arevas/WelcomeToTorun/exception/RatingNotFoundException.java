package com.arevas.WelcomeToTorun.exception;

public class RatingNotFoundException extends RuntimeException {

    public RatingNotFoundException(Long id) {
        super("Nie znaleziono oceny o id: " + id + ".");
    }
}
