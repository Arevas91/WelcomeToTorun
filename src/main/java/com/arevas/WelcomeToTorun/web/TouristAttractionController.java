package com.arevas.WelcomeToTorun.web;

import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.domain.TouristAttraction;
import com.arevas.WelcomeToTorun.service.PdfReportService;
import com.arevas.WelcomeToTorun.service.RatingService;
import com.arevas.WelcomeToTorun.service.TouristAttractionService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/auth/tourist-attraction/")
@CrossOrigin("http://localhost:3000")
public class TouristAttractionController {

    private final TouristAttractionService touristAttractionService;
    private final RatingService ratingService;

    public TouristAttractionController(TouristAttractionService touristAttractionService, RatingService ratingService) {
        this.touristAttractionService = touristAttractionService;
        this.ratingService = ratingService;
    }

    @GetMapping("list")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<TouristAttraction> getAllTouristAttraction() {
        return touristAttractionService.getAllTouristAttraction();
    }

    @GetMapping("list/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public TouristAttraction getTouristAttractionById(@PathVariable Long id) {
        return touristAttractionService.findTouristAttractionById(id);
    }

    @PostMapping("add")
    @PreAuthorize("hasRole('ADMIN')")
    public void createTouristAttraction(@RequestBody TouristAttraction touristAttraction) {
        touristAttractionService.createNewTouristAttraction(touristAttraction);
    }

    @DeleteMapping("list/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteTouristAttraction(@PathVariable Long id) {
        touristAttractionService.removeTouristAttraction(id);
    }

    @PutMapping("list/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void putTouristAttraction(@PathVariable Long id, @RequestBody TouristAttraction touristAttraction) {
        touristAttractionService.updateTouristAttraction(id, touristAttraction);
    }

    @RequestMapping(value = "pdf/report/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<InputStreamResource> reports(@PathVariable Long id) {
        TouristAttraction touristAttraction = touristAttractionService.findTouristAttractionById(id);
        double averageRating = ratingService.getAverageRatingByTouristAttractionId(touristAttraction.getId());
        List<Rating> touristAttractionList = ratingService.getAllRatingByTouristAttractionId(touristAttraction.getId());
        ByteArrayInputStream bis = PdfReportService.singleTouristAttractionReport(touristAttraction, averageRating, touristAttractionList);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=file.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
