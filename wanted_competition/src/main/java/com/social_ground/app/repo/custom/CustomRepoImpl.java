package com.social_ground.app.repo.custom;


import javax.persistence.EntityManager;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.social_ground.app.entity.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomRepoImpl implements CustomRepo {

    private final EntityManager entityManager;

//    private EntityTransaction entityTransaction;
//
//    @PostConstruct
//    public void init(){
//        entityTransaction = entityManager.getTransaction();
//    }

    @Override
    @Transactional
    public void createUser(User user){

        try {
//            EntityTransaction entityTransaction = entityManager.getTransaction();

            // 트랜잭션 시작
//            entityTransaction.begin();

            entityManager.persist(user);

//            entityTransaction.commit();

        }
        catch(Exception e) {
            System.out.println("유저 생성 간 문제 발생 : " + e);

            throw e;
        }
    }
}
