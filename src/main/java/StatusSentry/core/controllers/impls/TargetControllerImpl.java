package StatusSentry.core.controllers.impls;

import StatusSentry.core.controllers.TargetController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TargetControllerImpl implements TargetController {
    @Override
    public ResponseEntity<Void> getAllUrls() {
        return null;
    }
}
