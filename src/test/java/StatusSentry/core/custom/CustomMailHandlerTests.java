package StatusSentry.core.custom;

import StatusSentry.core.utils.customs.CustomMailHandler;
import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Properties;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class CustomMailHandlerTests {

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private TemplateEngine templateEngine;

    @InjectMocks
    private CustomMailHandler customMailHandler;

    @BeforeEach
    void setUp() {
        Session session = Session.getDefaultInstance(new Properties());
        MimeMessage realMimeMessage = new MimeMessage(session);

        when(mailSender.createMimeMessage()).thenReturn(realMimeMessage);

        ReflectionTestUtils.setField(customMailHandler, "standardEmail", "noreply@statussentry.com");
    }

    @Test
    @DisplayName("Need to submit and process the HTML template")
    void sendVerificationEmail_WithoutError() {
        String destination = "danieltenorio2046@gmail.com";
        String token = "HTP45";
        String htmlSimula = "<html>Conteudo do HTP45</html>";

        when(templateEngine.process(eq("verificationEmail"), any(Context.class)))
                .thenReturn(htmlSimula);

        customMailHandler.sendVerificationEmail(destination, token);

        verify(templateEngine, times(1)).process(eq("verificationEmail"), any(Context.class));
        verify(mailSender, times(1)).send(any(MimeMessage.class));
    }
}