package StatusSentry.core.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class MonitorTarget {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String url;
    private Integer checkInterval;
    private boolean isUp;
    private LocalDateTime lastCheck;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
