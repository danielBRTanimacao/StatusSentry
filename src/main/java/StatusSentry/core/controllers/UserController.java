package StatusSentry.core.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("api/user")
public interface UserController {
    @PostMapping
    ResponseEntity<Void> createUser();

    @PostMapping
    ResponseEntity<Void> updateUser();

    @PostMapping
    ResponseEntity<Void> deleteUser();

    @PostMapping
    ResponseEntity<Void> loginUser();
}
