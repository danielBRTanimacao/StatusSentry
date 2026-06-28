package StatusSentry.core.utils.customs.raises;

public class MessagingMailFailed extends RuntimeException{
    public MessagingMailFailed(String msg) {
        super(msg);
    }

    public MessagingMailFailed(String msg, Throwable err) {
        super(msg, err);
    }
}
