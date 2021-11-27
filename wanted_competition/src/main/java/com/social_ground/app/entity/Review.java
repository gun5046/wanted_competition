package com.social_ground.app.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name= "review")
public class Review implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="review_id")
	private int id;
	
	@Column(name="text")
	private String text;
	
	@Column(name = "author")
    private String author;

    @Column(name = "store_name")
    private String storeName;
	
	@Column(name="image_url")
	private String imageURL;
	
	@Setter
    @ManyToOne
    @JoinColumn(name = "review_store_id")
    private Store store;

    @Setter
    @ManyToOne
    @JoinColumn(name = "review_user_id")
    private User user;
	
}
