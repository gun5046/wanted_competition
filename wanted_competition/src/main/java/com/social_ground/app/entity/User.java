package com.social_ground.app.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity(name = "user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private long id;
    
    @Column(name = "login_id")
    private String loginId;
    
    @Column(name = "email", nullable = false)
    private String email;

   
    @Column(name = "profile_image_url")
    private String profileImageURL = "";

    @Column(nullable = false)
    private String nickname;

    
    private String age;

    private String gender = "";

    @Column(name = "point")
    private int point;

    public void givePoint(int point) {
    	this.point = point;
    }
}
