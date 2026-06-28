package StatusSentry.core.scheduler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MonitorWorker {

    // injetar o WebClient ou a gota do RestTemplate

    @Async("monitorExecutor")
    public void checkUrl(String url) {
        long startTime = System.currentTimeMillis();
        try {
            // HttpStatusCode status = httpClient.get(url);

            log.info("cheking: {} on thread {}", url, Thread.currentThread().getName());

            // salvar o log de sucesso/erro no banco
        } catch (Exception e) {
            // alerta (envio de e-mail/webhook se a bixiga  cair)
        }
    }
}