package StatusSentry.core.controllers.impls;

import StatusSentry.core.DTOs.monitor.PageResponseMonitor;
import StatusSentry.core.controllers.TargetController;
import StatusSentry.core.service.MonitorTargetService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TargetControllerImpl implements TargetController {

    private final MonitorTargetService service;

    @Override
    public ResponseEntity<Page<PageResponseMonitor>> getAllUrls(int page, int size) {
        return ResponseEntity.ok().body(service.getAll(page, size));
    }

    @Override
    public ResponseEntity<Void> addNewUrl() {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteUrl(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Void> specificUrl(Long id) {
        return null;
    }
}
