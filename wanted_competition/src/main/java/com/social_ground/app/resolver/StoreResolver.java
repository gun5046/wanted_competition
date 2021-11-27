package com.social_ground.app.resolver;

import java.util.Set;

import com.social_ground.app.entity.Review;
import org.springframework.stereotype.Component;

import com.social_ground.app.entity.Menu;
import com.social_ground.app.entity.Store;
import com.social_ground.app.service.StoreService;

import graphql.kickstart.tools.GraphQLResolver;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StoreResolver implements GraphQLResolver<Store> {

    private final StoreService storeService;

    public Set<Menu> getMenus(Store store) {
        return storeService.getMenus(store);
    }

    public Set<Review> getReviews(Store store) {
        return storeService.getReviews(store);
    }
}
