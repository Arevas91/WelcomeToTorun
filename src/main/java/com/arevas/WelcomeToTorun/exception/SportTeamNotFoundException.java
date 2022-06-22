package com.arevas.WelcomeToTorun.exception;

public class SportTeamNotFoundException extends RuntimeException {

    public SportTeamNotFoundException(Long id) {
        super("Nie znaleziono drużyny sportowej o id: " + id + ".");
    }
}
