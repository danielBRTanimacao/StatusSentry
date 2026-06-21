package StatusSentry.core.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/targets")
public interface TargetController {
    @GetMapping
    ResponseEntity<Void> getAllUrls();
}
    