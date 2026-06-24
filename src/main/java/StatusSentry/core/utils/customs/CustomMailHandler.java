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

    @Value("${spring.standard.email}")
    private String standardEmail;

    public void sendVerificationEmail(String destination, String token) {
        log.info("init send email for: {}", destination);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            Context context = new Context();
            context.setVariable("token", token);

            String htmlContent = templateEngine.process("verificationEmail", context);

            helper.setFrom(standardEmail);
            helper.setTo(destination);
            helper.setSubject("Seu token de acesso - StatusSentry");
            helper.setText(htmlContent, true);

            mailSender.send(message);

            log.debug("Email success submitted {}", destination);

        } catch (Exception e) {
            log.error("Fail sending email {}: {}", destination, e.getMessage());
        }
    }
}