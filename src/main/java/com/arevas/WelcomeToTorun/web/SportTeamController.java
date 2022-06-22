package com.arevas.WelcomeToTorun.web;

import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.domain.SportTeam;
import com.arevas.WelcomeToTorun.service.*;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/auth/sport-team")
@CrossOrigin("http://localhost:3000")
public class SportTeamController {

    private final SportTeamService sportTeamService;
    private final RatingService ratingService;

    public SportTeamController(SportTeamService sportTeamService, RatingService ratingService) {
        this.sportTeamService = sportTeamService;
        this.ratingService = ratingService;
    }

    @GetMapping("list")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<SportTeam> getAllSportTeam() {
        return sportTeamService.getAllSportTeam();
    }

    @GetMapping("list/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public SportTeam getSportTeamById(@PathVariable Long id) {
        return sportTeamService.findSportTeamById(id);
    }

    @PostMapping("add")
    @PreAuthorize("hasRole('ADMIN')")
    public void createSportTeam(@RequestBody SportTeam sportTeam) {
        sportTeamService.createNewSportTeam(sportTeam);
    }

    @DeleteMapping("list/{id}")
    @PreAuthorize(" hasRole('ADMIN')")
    public void deleteSportTeam(@PathVariable Long id) {
        sportTeamService.removeSportTeam(id);
    }

    @PutMapping("list/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void putSportTeam(@PathVariable Long id, @RequestBody SportTeam sportTeam) {
        sportTeamService.updateSportTeam(id, sportTeam);
    }

    @RequestMapping(value = "pdf/report/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<InputStreamResource> reports(@PathVariable Long id) {
        SportTeam sportTeam = sportTeamService.findSportTeamById(id);
        double averageRating = ratingService.getAverageRatingBySportTeamId(sportTeam.getId());
        List<Rating> sportTeamList = ratingService.getAllRatingBySportTeamId(sportTeam.getId());
        ByteArrayInputStream bis = PdfReportService.singleSportTeamReport(sportTeam, averageRating, sportTeamList);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=file.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
