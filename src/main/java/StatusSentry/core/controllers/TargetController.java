package StatusSentry.core.controllers;

import StatusSentry.core.DTOs.monitor.PageResponseMonitorDTO;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/targets")
public interface TargetController {
    @GetMapping
    ResponseEntity<Page<PageResponseMonitorDTO>> getAllUrls(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    );

    @PostMapping
    ResponseEntity<Void> addNewUrl();

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUrl(@PathVariable Long id);

    @GetMapping("/{id}")
    ResponseEntity<Void> specificUrl(@PathVariable Long id);
}
    