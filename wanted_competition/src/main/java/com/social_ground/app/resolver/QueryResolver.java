package com.social_ground.app.resolver;

import java.util.List;

import org.springframework.stereotype.Component;

import com.social_ground.app.entity.Store;
import com.social_ground.app.entity.User;
import com.social_ground.app.service.StoreService;
import com.social_ground.app.service.UserService;

import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class QueryResolver implements GraphQLQueryResolver {

    private final UserService userService;


    private final StoreService storeService;


    
    public Store findStore(String name) {
    	return storeService.findStore(name);
    }
    
    
    public User getUserInfo(String id) {
    	return userService.getUserInfo(id);
    }

    public List<Store> getAllStore() {
        return storeService.getAllStore();
    }
    

    
    public int getPoint(String loginId) {
    	return userService.getPoint(loginId);
    }
//  public List<Image> getImageList(DataFetchingEnvironment env) {
//  User user = authProvider.authenticate(env);
//
//  return imageService.getImageList(user);
//}

}

