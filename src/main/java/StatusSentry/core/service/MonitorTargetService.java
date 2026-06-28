package StatusSentry.core.service;

import StatusSentry.core.DTOs.monitor.PageResponseMonitor;
import org.springframework.data.domain.Page;

public interface MonitorTargetService {
    Page<PageResponseMonitor> getAll(int page, int size);
    void getUrl();
    void createUrl();
    void delUrl();
}
