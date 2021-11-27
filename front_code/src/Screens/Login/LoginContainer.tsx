import React from 'react';
import LoginScreen from './LoginScreen';
import { LoginNavProp } from 'types';
import { useMutation, useReactiveVar } from '@apollo/client';
import { SIGN_USER } from 'Commons/mutations';

import { getProfile, login } from '@react-native-seoul/kakao-login';
import { userState } from 'store';

type Props = {
	navigation: LoginNavProp;
};

type KakaoResponseType = {
	email: string;
	id: string;
	nickname: string;
	gender: string;
	ageRange: string;
};

const LoginContainer: React.FC<Props> = ({ navigation }) => {
	const [signUser] = useMutation(SIGN_USER);

	const { saveUser } = useReactiveVar(userState);

	// 소셜 로그인 시작 -> db에 접근해 등록된 사용자인지 확인
	const onPressKakao = async () => {
		await login();
		const userInfo = await getKakaoProfile();

		if (userInfo) {
			const {
				email,
				id: loginId,
				nickname,
				gender,
				ageRange: age,
				profileImageUrl,
			} = userInfo;

			saveUser({
				profileImageURL: profileImageUrl,
				loginId,
				email,
				nickname,
				gender,
				age,
			});

			signUser({
				variables: {
					email,
					loginId,
					nickname,
					gender,
					age,
					profileImageURL: profileImageUrl,
				},
			}).then((res) => {
				const success = res.data.signUser;
				if (success) {
					navigation.navigate('BottomTab');
				}
			});
		}
	};

	return <LoginScreen onPressKakao={onPressKakao} />;
};

const getKakaoProfile = async () => {
	try {
		const result = await getProfile();
		return result;
	} catch (err) {
		console.log(err);
	}
};

export default LoginContainer;
