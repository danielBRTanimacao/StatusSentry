package StatusSentry.core.utils.customs;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@RequiredArgsConstructor
public class CustomMailHandler {

    @Value("${spring.standard.email}")
    private static final String EMAIL;
    private String destination;
    private String summary;

    public void sendEmail() {

    }

    public void setEmail() {

    }

    public void getEmail() {

    }
}


