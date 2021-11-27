//package com.social_ground.app.service;
//
//import com.social_ground.app.entity.Image;
//import com.social_ground.app.entity.User;
//import com.social_ground.app.error.GraphQLErrorHandler;
//import com.social_ground.app.provider.FileProvider;
//import com.social_ground.app.factory.FactoryManager;
//import com.social_ground.app.util.QuestManager;
//import com.social_ground.app.repo.ImageRepo;
//import com.social_ground.app.repo.UserRepo;
//import com.social_ground.app.util.DateManager;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import javax.servlet.http.Part;
//import java.io.IOException;
//import java.util.*;
//
//@Service
//@RequiredArgsConstructor
//public class ImageService {
//
//    private final ImageRepo imageRepo;
//
//    private final UserRepo userRepo;
//
//    private final FileProvider fileProvider;
//
//    private final QuestManager questManager;
//
//    private final DateManager dateManager;
//
//    private final FactoryManager factoryManager;
//
//    private final GraphQLErrorHandler graphQLErrorHandler;
//
//    public User saveImage(Part file, User user) {
//
//        try {
//            String imageType = file.getSubmittedFileName();
//
//            System.out.println("imageType : " + imageType);
//
//            if(!factoryManager.recognize(file, imageType)){
//				return null;
//            }
//
//            String nowDate = dateManager.getNowDate();
//
//            // S3에 업로드
//            String uploadedUrl = fileProvider.upload(file, "images");
//            String userId = user.getId();

//            // 이미지 db 저장
//            imageRepo.insert(new Image(userId, uploadedUrl, nowDate, imageType));

//            userRepo.save(user);
//
//            return user;
//        }
//        catch(IOException e){
//            System.out.println(e);
//            return null;
//        }
//    }
//
//    public List<Image> getImageList(User user) {
//        String uid = user.getId();
//
//        List<Image> images = imageRepo.findByUid(uid);
//
//        // 생성 날짜 순으로 정렬
//        Collections.sort(images);
//
//        return images;
//    }
//}