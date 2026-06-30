package StatusSentry.core.DTOs.monitor;

import StatusSentry.core.entities.MonitorTargetEntity;
import StatusSentry.core.entities.UserEntity;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

public record RequestMonitorTargetDTO(
        @NotBlank
        UserEntity user,
        @NotBlank
        String name,
        @NotBlank
        @URL
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
