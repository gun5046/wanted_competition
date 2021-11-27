package com.social_ground.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.social_ground.app.entity.Menu;

@Repository
public interface MenuRepo extends JpaRepository<Menu, Long> {
}
