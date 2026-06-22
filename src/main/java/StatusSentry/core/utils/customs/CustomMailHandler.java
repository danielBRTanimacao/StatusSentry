package StatusSentry.core.utils.customs;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

@RequiredArgsConstructor
@Slf4j
public class CustomMailHandler {

    @Value("${spring.standard.email}")
    private String STANDARD_EMAIL;
    private String destination;
    
    private String token;

    public void sendEmail() {
        String SUMMARY = "Este vai ser o texto enviado para o email do caba junto do token " + this.token;

        log.info("Sending the email");

        log.debug("Email sent successfully");
    }

    public void setEmail(String mail) {
        this.destination = mail;

    }

    public String getEmail() {
        return this.destination;
    }
}


