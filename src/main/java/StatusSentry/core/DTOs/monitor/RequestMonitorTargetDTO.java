package StatusSentry.core.DTOs.monitor;

import StatusSentry.core.entities.MonitorTargetEntity;
import StatusSentry.core.entities.UserEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record RequestMonitorTargetDTO(
        @NotBlank
        UserEntity user,
        @NotBlank
        @Size(min = 3, max = 50, message = "The name must be between 3 and 50 characters long.")
        String name,
        @NotBlank
        @URL(message = "The URL must be a valid link.")
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
