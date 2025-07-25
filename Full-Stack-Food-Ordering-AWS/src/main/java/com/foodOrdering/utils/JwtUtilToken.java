package com.foodOrdering.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

@Component
public class JwtUtilToken {

    @Value("${jwt.secret.key}")
    private String SECRET_KEY;
    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    public String generateToken(UserDetails userDetails){
        Map<String, Objects> claims = new HashMap<>();
        return createToken(claims,userDetails.getUsername());
    }

    private String createToken(Map<String, Objects> claims, String username) {
          return   Jwts.builder()
                    .setClaims(claims)
                    .setSubject(username)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis()+1000*60*60*10))//10 hr expiration
                    .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
                    .compact();

    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public long getExpirationTime() {
        return jwtExpiration;
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    public boolean validateToken(String token, UserDetails userDetails){
        final  String userName = extractUsername(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
