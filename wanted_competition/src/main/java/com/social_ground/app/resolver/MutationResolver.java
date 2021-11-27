package com.social_ground.app.resolver;

import javax.servlet.http.Part;

import org.springframework.stereotype.Component;

import com.social_ground.app.entity.Review;
import com.social_ground.app.entity.Store;
//import com.social_ground.app.service.ImageService;
//import com.social_ground.app.service.QuestService;
import com.social_ground.app.service.StoreService;
import com.social_ground.app.service.UserService;

import graphql.kickstart.tools.GraphQLMutationResolver;
import graphql.schema.DataFetchingEnvironment;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MutationResolver implements GraphQLMutationResolver {

    private final UserService userService;

    private final StoreService storeService;

    public boolean signUser(String email, String nickname, String loginId, String age, String gender, String profileImageURL, DataFetchingEnvironment env){
    	
        return userService.signUser(email, nickname, loginId, age, gender, profileImageURL);
    }



    public Store insertStore(String name, Part image, String address, String ph) {

        return storeService.insertStore(name, image, address, ph);
    }

    public Boolean insertMenu(String name, Part image, String description, Boolean disable, long storeId) {

        return storeService.insertMenu(name, image, description,  disable, storeId);
    }

    public Boolean updateStore(long id, String name, Part image, String address, String ph) {

        return storeService.updateStore(id, name, image, address, ph);
    }

    public Boolean updateMenu(long id, String name, Part image, String description, Boolean disable, long storeId) {

        return storeService.updateMenu(id, name, image, description, disable, storeId);
    }

    public Boolean deleteStore(long id) {

        return storeService.deleteStore(id);
    }
    
    public Review insertReview(String text, Part image, long storeId, String loginId) {
        return storeService.insertReview(text, image, storeId, loginId);
    }

    
    public Boolean deleteMenu(long id) {

        return storeService.deleteMenu(id);
    }
    
    public boolean givePoint(String loginId) {
    	return userService.givePoint(loginId);
    }

//    public User saveImage(Part file, DataFetchingEnvironment env){
//        User user = authProvider.authenticate(env);
//        return imageService.saveImage(file, user);
//    }

}
