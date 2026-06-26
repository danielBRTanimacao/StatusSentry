package StatusSentry.core.utils.customs;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomMailHandler {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${statussentry.mail.sender}")
    private String senderEmail;

    public void sendVerificationEmail(String destination, String token) {
        log.info("Sending verification email to: {}", destination);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            Context context = new Context();
            context.setVariable("token", token);

            String htmlContent = templateEngine.process("verificationEmail", context);

            helper.setFrom(senderEmail);
            helper.setTo(destination);
            helper.setSubject("Seu token de acesso - StatusSentry");
            helper.setText(htmlContent, true);

            mailSender.send(message);

            log.info("Verification email sent successfully to: {}", destination);

        } catch (Exception e) {
            log.error("Failed to send verification email to {}: {}", destination, e.getMessage(), e);
            throw new RuntimeException("Failed to send verification email to: " + destination, e);
        }
    }
}