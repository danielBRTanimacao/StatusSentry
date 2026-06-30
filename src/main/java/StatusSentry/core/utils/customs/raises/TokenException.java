package StatusSentry.core.utils.customs.raises;

public class TokenException extends RuntimeException{
    public TokenException(String msg) {
        super(msg);
    }
    public TokenException(String msg, Throwable err) {
        super(msg, err);
    }
}
