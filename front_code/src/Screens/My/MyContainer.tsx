import React, { useEffect, useState } from 'react';
import MyScreen from './MyScreen';
import { MyNavProp } from 'types';
import { useQuery, useReactiveVar } from '@apollo/client';
import { userState } from 'store';
import { GET_POINT } from 'Commons/queries';

type Props = {
	navigation: MyNavProp;
};

const MyContainer: React.FC<Props> = ({ navigation }) => {
	const { userInfo } = useReactiveVar(userState);

	const [point, setPoint] = useState(0);

	const { data } = useQuery(GET_POINT, {
		variables: {
			loginId: userInfo?.loginId || '',
		},
		fetchPolicy: 'no-cache',
	});

	useEffect(() => {
		if (data) {
			setPoint(data.getPoint);
		}
	}, [data]);

	const onPressHome = () => {
		navigation.navigate('Home');
	};

	return (
		<MyScreen
			nickname={userInfo && userInfo.nickname ? userInfo.nickname : ''}
			profileImageURL={
				userInfo && userInfo.profileImageURL ? userInfo.profileImageURL : ''
			}
			point={point}
			onPressHome={onPressHome}
		/>
	);
};

export default MyContainer;
