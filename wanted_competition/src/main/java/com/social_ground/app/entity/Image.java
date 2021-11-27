//package com.social_ground.app.entity;
//
//import com.social_ground.app.util.DateManager;
//import lombok.*;
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//
//import javax.persistence.Entity;
//import java.text.ParseException;
//import java.util.Date;
//
//
//@Document("images")
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//@Getter
//public class Image implements Comparable<Image>{
//
//    @Id
//    private String id;
//
//    private String uid;     // 소유한 유저 id
//
//    private String url;     // image 주소
//
//    private String createdAt; // image 생성일자
//
//    private String type;     // image 종류
//
//    @Builder
//    public Image(String uid, String url, String createdAt, String type){
//        this.uid = uid;
//        this.url = url;
//        this.createdAt = createdAt;
//        this.type = type;
//    }
//
//    @Override
//    public int compareTo(Image img){
//        return new DateManager().compareDate(this.createdAt, img.createdAt);
//    }
//}