package com.social_ground.app.util;

import java.util.Base64;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JWT {

    @Value("${JWT.secretKey}")
    private String secretKey;

//    private final long accessTokenValidTime = 1000L;
    private final long accessTokenValidTime = 3 * 3600 * 1000L;
    private final long refreshTokenValidTime = 7 * 24 * 3600 * 1000L;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createAccessToken(String userId){

        Date now = new Date();

        Claims claims = Jwts.claims()
                .setSubject("accessToken")
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenValidTime));

        claims.put("id", userId);     // 토큰에 담을 정보

        String jwt = "Bearer " + Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return jwt;
    }

    public String createRefreshToken(String userId){

        Date now = new Date();

        Claims claims = Jwts.claims()
                .setSubject("refreshToken")
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime));

        claims.put("id", userId);     // 토큰에 담을 정보

        String jwt = "Bearer " + Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return jwt;
    }

    public String getAccessToken(HttpServletRequest request) {
        return request.getHeader("Authorization_access");
    }

    public String getRefreshToken(HttpServletRequest request) {
        return request.getHeader("Authorization_refresh");
    }

    public String getLoginType(HttpServletRequest request){ return request.getHeader("loginType");}

    public void setAccessToken(HttpServletResponse response, String token){
        response.setHeader("Authorization_access", token);
    }

    public void setRefreshToken(HttpServletResponse response, String token){
        response.setHeader("Authorization_refresh", token);
    }

    public String getUserByToken(String originToken) {
        String token = checkAndSplitBearer(originToken);
        String userId;
        try{
            userId = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("id").toString();
        }catch (ExpiredJwtException e) {
            userId = e.getClaims().get("id").toString();
        }

        return userId;
    }

    public boolean validateToken(String originToken) {
        String token = checkAndSplitBearer(originToken);

        if(token.equals(""))
            return false;

        try{
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        }catch(Exception e){
            return false;
        }
    }

    private String checkAndSplitBearer(String token) {
        String[] splitToken = token.split(" ");

        if(splitToken[0].equals("Bearer")){
            return splitToken[1];
        }
        else{
            return null;
        }
    }

}
