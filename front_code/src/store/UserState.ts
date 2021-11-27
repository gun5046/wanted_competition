import { makeVar } from '@apollo/client';

export type UserInfoType = {
	loginId: string;
	profileImageURL: string;
	email: string;
	nickname: string;
	age: string;
	gender: string;
};

export type UserStateType = {
	saveUser: (userInfo: UserInfoType) => void;
	updateUserInfo: (userInfo: UserInfoType) => void;
	userInfo: UserInfoType | undefined;
};

const saveUser = (userInfo: UserInfoType) => {
	const prevState = userState();

	userState({
		...prevState,
		userInfo,
	});
};

const updateUserInfo = (userInfo: UserInfoType) => {
	const prevState = userState();

	userState({ ...prevState, userInfo });
};

const initialUserState: UserStateType = {
	saveUser,
	updateUserInfo,
	userInfo: undefined,
};

const userState = makeVar<UserStateType>(initialUserState);

export default userState;
