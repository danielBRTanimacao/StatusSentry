package StatusSentry.core.service.impl;

import StatusSentry.core.DTOs.monitor.PageResponseMonitor;
import StatusSentry.core.service.MonitorTargetService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class MonitorTargetServiceImpl implements MonitorTargetService {
    @Override
    public Page<PageResponseMonitor> getAll(int page, int size) {
        return null;
    }

    @Override
    public void getUrl() {

    }

    @Override
    public void createUrl() {

    }

    @Override
    public void delUrl() {

    }
}
