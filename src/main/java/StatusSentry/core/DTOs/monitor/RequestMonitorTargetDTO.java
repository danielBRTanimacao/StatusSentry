package StatusSentry.core.DTOs.monitor;

import StatusSentry.core.entities.UserEntity;

public record RequestMonitorTargetDTO(
        UserEntity user,
        String name,
        String url
) {
}
