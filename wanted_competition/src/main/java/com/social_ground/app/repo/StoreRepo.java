package com.social_ground.app.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.social_ground.app.entity.Store;

@Repository
public interface StoreRepo extends JpaRepository<Store, Long>{
	Optional<Store> findByName(String name);
}
