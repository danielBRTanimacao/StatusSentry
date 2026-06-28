package StatusSentry.core.service.impl;

import StatusSentry.core.DTOs.monitor.PageResponseMonitorDTO;
import StatusSentry.core.entities.MonitorTargetEntity;
import StatusSentry.core.repositories.MonitorTargetRepository;
import StatusSentry.core.service.MonitorTargetService;
import StatusSentry.core.utils.customs.raises.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MonitorTargetServiceImpl implements MonitorTargetService {

    private final MonitorTargetRepository repository;

    @Override
    public Page<PageResponseMonitorDTO> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        log.info("Page requested: {}", pageable);
        Page<MonitorTargetEntity> entitiesPage = repository.findAll(pageable);
        return entitiesPage.map(PageResponseMonitorDTO::fromEntity);
    }

    @Override
    public MonitorTargetEntity getUrl(Long id) {
        return repository.findById(id).orElseThrow(()-> new NotFoundException("Url not found with id " + id));
    }

    @Override
    public void createUrl() {

    }

    @Override
    public void delUrl(Long id) {

    }

    @Override
    public void updtUrl(Long id) {

    }
}
