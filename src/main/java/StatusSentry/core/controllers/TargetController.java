package StatusSentry.core.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/targets")
public interface TargetController {
    @GetMapping
    ResponseEntity<Void> getAllUrls();

    @PostMapping
    ResponseEntity<Void> addNewUrl();

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUrl(@PathVariable Long id);

    @GetMapping("/{id}")
    ResponseEntity<Void> specificUrl(@PathVariable Long id);
}
    