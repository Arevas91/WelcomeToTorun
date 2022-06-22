package com.arevas.WelcomeToTorun.security.JWT;

import com.arevas.WelcomeToTorun.security.USER.UserDetailsImpl;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${welcome-to-torun.app.jwtSecret}")
    private String jwtSecret;

    @Value("${welcome-to-torun.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Nieprawidłowa sygnatura JWT: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Nieprawidłowy JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token wygasł: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token jest nieobsługiwany: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims jest pusty: {}", e.getMessage());
        }
        return false;
    }
}
