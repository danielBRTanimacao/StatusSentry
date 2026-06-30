package StatusSentry.core.service;

import StatusSentry.core.DTOs.monitor.PageResponseMonitorDTO;
import StatusSentry.core.DTOs.monitor.RequestMonitorTargetDTO;
import StatusSentry.core.entities.MonitorTargetEntity;
import org.springframework.data.domain.Page;

public interface MonitorTargetService {
    Page<PageResponseMonitorDTO> getAll(int page, int size);
    MonitorTargetEntity getUrl(Long id);
    void createUrl(RequestMonitorTargetDTO data);
    void delUrl(Long id);
    void updtUrl(Long id);
}
