package com.social_ground.app.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.social_ground.app.entity.User;

public interface UserRepo extends JpaRepository<User, Long> {


    Boolean existsByEmail(String email);
    Boolean existsByNickname(String nickname);
    Boolean existsByLoginId(String loginId);
    Optional<User> findByEmail(String Email);
    Optional<User> findByLoginId(String loginId);
}
