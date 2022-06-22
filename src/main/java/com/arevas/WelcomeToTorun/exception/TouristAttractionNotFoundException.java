package com.arevas.WelcomeToTorun.exception;

public class TouristAttractionNotFoundException extends RuntimeException {

    public TouristAttractionNotFoundException(Long id) {
        super("Nie znaleziono atrakcji turystycznej o id: " + id + ".");
    }
}
