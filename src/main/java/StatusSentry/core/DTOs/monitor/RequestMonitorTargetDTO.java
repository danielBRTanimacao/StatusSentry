package StatusSentry.core.DTOs.monitor;

import StatusSentry.core.entities.UserEntity;

import java.time.LocalDateTime;

public record RequestMonitorTargetDTO(
        UserEntity user,
        String name,
        String url
) {
}
