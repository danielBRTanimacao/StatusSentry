package StatusSentry.core.DTOs.monitor;

import StatusSentry.core.entities.MonitorTargetEntity;
import StatusSentry.core.entities.UserEntity;

import java.time.LocalDateTime;

public record PageResponseMonitorDTO(
        Long id,
        UserEntity user,
        String name,
        String url,
        Integer checkInterval,
        boolean isUp,
        LocalDateTime lastCheck,
        LocalDateTime createdAt

) {
    public static PageResponseMonitorDTO fromEntity(MonitorTargetEntity entity) {
        return new PageResponseMonitorDTO(
                entity.getId(),
                entity.getUser(),
                entity.getName(),
                entity.getUrl(),
                entity.getCheckInterval(),
                entity.isUp(),
                entity.getLastCheck(),
                entity.getCreatedAt()
        );
    }
}
