package StatusSentry.core.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MonitorScheduler {

    private final MonitorWorker monitorWorker;

    public MonitorScheduler(MonitorWorker monitorWorker) {
        this.monitorWorker = monitorWorker;
    }

    @Scheduled(fixedRate = 60000)
    public void executeMonitoring() {
        // buscar apenas sites ativos do banco
        // List<MonitorTarget> = siteRepository.findByAtivoTrue();
        List<String> urlsExemple = List.of("https://www.google.com/");

        for (String url : urlsExemple) {
            monitorWorker.checkUrl(url);
        }
    }
}