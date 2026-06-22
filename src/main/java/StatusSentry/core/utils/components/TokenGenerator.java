package StatusSentry.core.utils.components;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
@Slf4j
public class TokenGenerator {
    private static final SecureRandom secureRandom = new SecureRandom();
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int TOKEN_LENGTH = 5;

    public String generateRandomCode() {
        log.info("Starting generation of a {}-character random secure token", TOKEN_LENGTH);

        StringBuilder tokenBuilder = new StringBuilder(TOKEN_LENGTH);

        for (int i = 0; i < TOKEN_LENGTH; i++) {
            int randomIndex = secureRandom.nextInt(CHARACTERS.length());
            tokenBuilder.append(CHARACTERS.charAt(randomIndex));
        }

        String generatedToken = tokenBuilder.toString();
        log.debug("Secure token generated successfully: {}", generatedToken);

        return generatedToken;
    }
}
