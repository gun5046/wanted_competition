package com.social_ground.app.service;

import org.springframework.stereotype.Service;

import com.social_ground.app.entity.User;
import com.social_ground.app.repo.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepo userRepo;

	public boolean signUser(String email, String nickname, String loginId, String age, String gender, String profileImageURL) {

		if (findUser(loginId)) {
			return true;
		} else {
			User user = User.builder().gender(gender).email(email).nickname(nickname).loginId(loginId).age(age).profileImageURL(profileImageURL)
					.build();
			try {
				userRepo.save(user);
			} catch (Exception e) {
				System.out.println(e);
				return false;
			}
		}
		return true;

	}

	public Boolean findUser(String login_id) {
		return userRepo.existsByLoginId(login_id);
	}

	public User getUserInfo(String id) {
		return userRepo.findByLoginId(id).get();
	}

	public boolean givePoint(String loginId) {
		try {
			java.util.Optional<User> user = userRepo.findByLoginId(loginId);
			user.get().givePoint(user.get().getPoint() + 200);
			userRepo.save(user.get());
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	public int getPoint(String loginId) {
		return userRepo.findByLoginId(loginId).get().getPoint();
	}
}
