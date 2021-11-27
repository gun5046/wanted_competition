import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, View } from 'native-base';
import MyButton from 'Components/MyButton';

type Props = {
	onPressKakao: () => void;
};

const LoginScreen: React.FC<Props> = ({ onPressKakao }) => {
	return (
		<Container style={styles.rootContainer}>
			<View style={styles.wrapper}>
				<Image
					style={styles.image}
					resizeMode={'stretch'}
					source={require('assets/defaults/main.png')}
				/>
				<View style={{ width: '90%', alignSelf: 'center' }}>
					<MyButton text={'카카오로 로그인'} onPress={onPressKakao} />
				</View>
			</View>
		</Container>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		width: '100%',

		borderWidth: 1,
	},
	wrapper: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
	},
	image: {
		width: '100%',
		height: 450,
	},
});
