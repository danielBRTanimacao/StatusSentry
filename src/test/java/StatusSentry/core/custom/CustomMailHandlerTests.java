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

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomMailHandlerTests {

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private TemplateEngine templateEngine;

    @InjectMocks
    private CustomMailHandler customMailHandler;

    private static final String SENDER     = "emailsubmit6@gmail.com";
    private static final String DESTINATARY = "danieltenorio2046@gmail.com";
    private static final String TOKEN       = "HTP45";
    private static final String HTML_MOCK   = "<html><body>Token: HTP45</body></html>";

    @BeforeEach
    void setUp() {
        MimeMessage realMimeMessage = new MimeMessage(
                Session.getDefaultInstance(new Properties())
        );
        when(mailSender.createMimeMessage()).thenReturn(realMimeMessage);
        ReflectionTestUtils.setField(customMailHandler, "senderEmail", SENDER);
    }

    @Test
    @DisplayName("Should process template and send email successfully")
    void sendVerificationEmail_success() {
        when(templateEngine.process(eq("verificationEmail"), any(Context.class)))
                .thenReturn(HTML_MOCK);

        customMailHandler.sendVerificationEmail(DESTINATARY, TOKEN);

        verify(templateEngine, times(1)).process(eq("verificationEmail"), any(Context.class));
        verify(mailSender, times(1)).send(any(MimeMessage.class));
    }

    @Test
    @DisplayName("Should throw RuntimeException when mail sending fails")
    void sendVerificationEmail_throwsOnMailError() {
        when(templateEngine.process(eq("verificationEmail"), any(Context.class)))
                .thenReturn(HTML_MOCK);

        doThrow(new RuntimeException("SMTP error"))
                .when(mailSender).send(any(MimeMessage.class));

        assertThrows(RuntimeException.class, () ->
                customMailHandler.sendVerificationEmail(DESTINATARY, TOKEN)
        );

        verify(mailSender, times(1)).send(any(MimeMessage.class));
    }

    @Test
    @DisplayName("Should throw RuntimeException when template processing fails")
    void sendVerificationEmail_throwsOnTemplateError() {
        when(templateEngine.process(eq("verificationEmail"), any(Context.class)))
                .thenThrow(new RuntimeException("Template not found"));

        assertThrows(RuntimeException.class, () ->
                customMailHandler.sendVerificationEmail(DESTINATARY, TOKEN)
        );

        verify(mailSender, never()).send(any(MimeMessage.class));
    }
}