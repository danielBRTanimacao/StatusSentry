package StatusSentry.core.DTOs.monitor;

import StatusSentry.core.entities.UserEntity;

import java.time.LocalDateTime;

public record PageResponseMonitor(
        Long id,
        UserEntity user,
        String name,
        String url,
        Integer checkInterval,
        boolean isUp,
        LocalDateTime lastCheck,
        LocalDateTime createdAt

) {
}
