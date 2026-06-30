package StatusSentry.core.DTOs.monitor;

import StatusSentry.core.entities.MonitorTargetEntity;
import StatusSentry.core.entities.UserEntity;

public record RequestMonitorTargetDTO(
        UserEntity user,
        String name,
        String url
) {
    public static MonitorTargetEntity toEntity(RequestMonitorTargetDTO dto) {
        MonitorTargetEntity entity = new MonitorTargetEntity();
        entity.setName(dto.name);
        entity.setUrl(dto.url);
        entity.setUser(dto.user);

        return entity;
    }
}
