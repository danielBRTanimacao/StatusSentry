package StatusSentry.core.controllers.impls;

import StatusSentry.core.DTOs.monitor.PageResponseMonitorDTO;
import StatusSentry.core.DTOs.monitor.RequestMonitorTargetDTO;
import StatusSentry.core.controllers.TargetController;
import StatusSentry.core.entities.MonitorTargetEntity;
import StatusSentry.core.service.MonitorTargetService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TargetControllerImpl implements TargetController {

    private final MonitorTargetService service;

    @Override
    public ResponseEntity<Page<PageResponseMonitorDTO>> getAllUrls(int page, int size) {
        return ResponseEntity.ok().body(service.getAll(page, size));
    }

    @Override
    public ResponseEntity<MonitorTargetEntity> specificUrl(Long id) {
        return ResponseEntity.ok().body(service.getUrl(id));
    }

    @Override
    public ResponseEntity<Void> addNewUrl(RequestMonitorTargetDTO data) {
        service.createUrl(data);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Void> updateUrl(RequestMonitorTargetDTO data, Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteUrl(Long id) {
        service.delUrl(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
