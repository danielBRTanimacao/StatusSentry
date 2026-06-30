package StatusSentry.core.controllers;

import StatusSentry.core.DTOs.monitor.PageResponseMonitorDTO;
import StatusSentry.core.DTOs.monitor.RequestMonitorTargetDTO;
import StatusSentry.core.entities.MonitorTargetEntity;
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

    @GetMapping("/{id}")
    ResponseEntity<MonitorTargetEntity> specificUrl(@PathVariable Long id);

    @PostMapping
    ResponseEntity<Void> addNewUrl(@RequestBody RequestMonitorTargetDTO data);

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUrl(@PathVariable Long id);

}
    