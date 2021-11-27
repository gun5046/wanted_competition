import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_POINT } from 'Commons/queries';
import { primaryColor, reactiveHeight, tagColor } from 'Commons/variables';
import { Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { userState } from 'store';
import { QRScreenNavProp } from 'types';

type Props = {
	navigation: QRScreenNavProp;
};

const QRScreen: React.FC<Props> = ({ navigation }) => {
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
		<View style={styles.root}>
			<View style={styles.wrapper}>
				<View style={styles.content}>
					<Text style={{ fontSize: 13 }}>200 포인트가 적립되었습니다.</Text>
					<Text style={{ fontSize: 13 }}>
						{userInfo?.nickname || ''}님의 현재 포인트 : {point}
					</Text>
					<TouchableOpacity style={styles.button} onPress={onPressHome}>
						<Text style={styles.buttonText}>홈으로</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default QRScreen;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: tagColor,
	},
	wrapper: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		width: '70%',
		height: '30%',
		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: 'white',
		borderRadius: 20,
	},
	button: {
		alignSelf: 'center',

		backgroundColor: primaryColor,
		borderRadius: 10,

		marginTop: reactiveHeight * 0.02,
	},
	buttonText: {
		padding: 5,
	},
});
