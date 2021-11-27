package com.social_ground.app.service;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.Part;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.social_ground.app.entity.Menu;
import com.social_ground.app.entity.Review;
import com.social_ground.app.entity.Store;
import com.social_ground.app.entity.User;
import com.social_ground.app.provider.FileProvider;
import com.social_ground.app.repo.MenuRepo;
import com.social_ground.app.repo.ReviewRepo;
import com.social_ground.app.repo.StoreRepo;
import com.social_ground.app.repo.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final FileProvider fileProvider;

    private final UserRepo userRepo;

    private final StoreRepo storeRepo;

    private final MenuRepo menuRepo;
    
    private final ReviewRepo reviewRepo;

    public Store insertStore(String name, Part image, String address, String ph) {

        try{
            String imageURL = "";

            if(image != null){
                imageURL = fileProvider.upload(image, name);
            }

            Store store = Store.builder()
                    .name(name)
                    .imageURL(imageURL)
                    .address(address)
                    .ph(ph)
                    .build();

            return storeRepo.save(store);
        }
        catch(IOException e){
            System.out.println("파일 입출력 오류 : " + e);
            return null;
        }
        catch(Exception e){
            System.out.println("가게 정보 입력 오류 : " + e);
            return null;
        }
    }

    public Store findStore(String name) {
    	return storeRepo.findByName(name).get();
    }
    
    @Transactional
    public Boolean insertMenu(String name, Part image, String description, Boolean disable, long storeId) {

        try{
            Optional<Store> store = storeRepo.findById(storeId);

            if(!store.isPresent())
                throw new Exception();

            String imageURL = "";

            if(image != null){
                imageURL = fileProvider.upload(image, store.get().getName());
            }

            Menu menu = Menu.builder()
                    .name(name)
                    .imageURL(imageURL)
                    .description(description)
                    .disable(disable)
                    .store(store.get())
                    .build();

            store.get().getMenus().add(menu);

            storeRepo.save(store.get());
        }
        catch(IOException e){
            System.out.println("파일 입출력 오류 : " + e);
        }
        catch(Exception e){
            System.out.println("가게 정보 입력 오류 : " + e);

        }

        return null;
    }

    @Transactional
    public Boolean updateStore(long id, String name, Part image, String address, String ph) {
        try{
            Optional<Store> prevStore = storeRepo.findById(id);

            if(!prevStore.isPresent())
                throw new NoSuchElementException();

            String imageURL = prevStore.get().getImageURL();

            if(image != null){
                fileProvider.delete(prevStore.get().getImageURL());

                System.out.println(image);

                imageURL = fileProvider.upload(image, name);
            }

            Store store = Store.builder()
                    .id(id)
                    .name(name)
                    .imageURL(imageURL)
                    .address(address)
                    .ph(ph)
                    .menus(prevStore.get().getMenus())
                    .build();

            storeRepo.save(store);

            return true;
        }
        catch (NoSuchElementException e) {
            System.out.println("db에 존재하지 않음 : " + e);
            return false;
        }
        catch(Exception e) {
            System.out.println("가게 업데이트 오류 : " + e);
            return false;
        }
    }

    @Transactional
    public Boolean updateMenu(long id, String name, Part image, String description, Boolean disable, long storeId) {

        try{
            Optional<Menu> prevMenu = menuRepo.findById(id);
            Optional<Store> store = storeRepo.findById(storeId);

            if(!store.isPresent())
                throw new Exception();

            if(prevMenu.isPresent()){
                // 메뉴가 존재하면 -> Update

                String imageURL = prevMenu.get().getImageURL();

                if(image != null){
                    fileProvider.delete(prevMenu.get().getImageURL());

                    System.out.println(image);

                    imageURL = fileProvider.upload(image, store.get().getName());
                }

                Menu menu = Menu.builder()
                        .id(id)
                        .name(name)
                        .imageURL(imageURL)
                        .description(description)
                        .disable(disable)
                        .store(store.get())
                        .build();

                menuRepo.save(menu);
            }
            else{
                // 메뉴가 없다면 -> insert

                String imageURL = "";

                if(image != null){
                    imageURL = fileProvider.upload(image, name);
                }

                Menu menu = Menu.builder()
                        .name(name)
                        .imageURL(imageURL)
                        .description(description)
                        .disable(disable)
                        .store(store.get())
                        .build();

                menuRepo.save(menu);


            }
        }
        catch(Exception e){
            System.out.println("메뉴 업데이트 오류 : " + e);
            return false;
        }

        return true;
    }

    @Transactional
    public Boolean deleteStore(long id) {

        try{
            Optional<Store> store = storeRepo.findById(id);

            if(!store.isPresent())
                throw new Exception();

            fileProvider.delete(store.get().getImageURL());

            for (Menu menu : store.get().getMenus()) {
                fileProvider.delete(menu.getImageURL());
            }

            storeRepo.delete(store.get());
        }
        catch(Exception e){
            System.out.println("가게 삭제 실패 : " + e);

            return false;
        }

        return true;
    }

    @Transactional
    public Boolean deleteMenu(long id) {

        try {
            Optional<Menu> menu = menuRepo.findById(id);


            if(!menu.isPresent())
                throw new Exception();

            fileProvider.delete(menu.get().getImageURL());

            Store store = menu.get().getStore();
            store.getMenus().remove(menu.get());

            storeRepo.save(store);
            menuRepo.delete(menu.get());
        }
        catch(Exception e) {
            System.out.println("메뉴 삭제 실패 : " + e);

            return false;
        }

        return true;
    }
    
    @Transactional
    public Review insertReview(String text, Part image, long storeId, String loginId) {
        try{
            Optional<Store> store = storeRepo.findById(storeId);
            Optional<User> user = userRepo.findByLoginId(loginId);

            if(!store.isPresent())
                throw new Exception();

            if(!user.isPresent())
                throw new Exception();

            String imageURL = "";

            if(image != null){
                imageURL = fileProvider.upload(image, store.get().getName());
            }

            Review review = Review.builder()
                    .text(text)
                    .imageURL(imageURL)
                    .author(user.get().getNickname())
                    .storeName(store.get().getName())
                    .store(store.get())
                    .user(user.get())
                    .build();

            store.get().getReviews().add(review);

            reviewRepo.save(review);

            return review;
        }
        catch(IOException e){
            System.out.println("파일 입출력 오류 : " + e);
            return null;
        }
        catch(Exception e){
            System.out.println("리뷰 입력 오류 : " + e);
            return null;
        }
    }

    public List<Store> getAllStore() {
        try{
            return storeRepo.findAll();
        }
        catch(Exception e){
            System.out.println("db 오류 : " + e);
            return null;
        }
    }

    public Set<Menu> getMenus(Store store) {
        return store.getMenus();
    }

    public Set<Review> getReviews(Store store) {
        return store.getReviews();
    }
}
