package StatusSentry.core.repositories;

import StatusSentry.core.entities.MonitorTargetEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonitorTargetRepository extends JpaRepository<MonitorTargetEntity, Long> {
}
