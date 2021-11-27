import React from 'react';
import {
	View,
	Icon,
	Header,
	Container,
	Left,
	Button,
	Body,
	Thumbnail,
} from 'native-base';
import { StyleSheet } from 'react-native';
import {
	backgroundColor,
	reactiveHeight,
	reactiveScreen,
	reactiveWidth,
	tagColor,
} from 'Commons/variables';
import { Text, Title } from 'react-native-paper';

type Props = {
	nickname: string;
	profileImageURL: string;
	point: number;
	onPressHome: () => void;
};

const MyScreen: React.FC<Props> = ({
	nickname,
	profileImageURL,
	point,
	onPressHome,
}) => {
	return (
		<Container style={styles.rootContainer}>
			<Header style={styles.header}>
				<Left>
					<Button transparent onPress={onPressHome}>
						<Icon
							style={{ fontSize: reactiveScreen * 0.025 }}
							name="arrow-back"
						/>
						<Text style={{ color: 'white' }}>홈</Text>
					</Button>
				</Left>
				<Body>
					<Title style={styles.title}>마이페이지</Title>
				</Body>
			</Header>
			<View style={styles.profileView}>
				<Thumbnail
					large
					source={
						profileImageURL
							? { uri: profileImageURL }
							: require('assets/defaults/thumbnail.png')
					}
				/>
				<Text style={styles.profileName}>{nickname}</Text>
				<Text style={styles.point}>현재 포인트 : {point} point</Text>
			</View>
		</Container>
	);
};

export default MyScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: 'white',
	},
	header: {
		height: reactiveHeight * 0.08,

		backgroundColor: backgroundColor,
	},
	title: {
		fontWeight: 'bold',
		fontSize: reactiveScreen * 0.025,
		color: 'white',
		marginLeft: reactiveWidth * 0.1,
	},
	profileView: {
		height: reactiveHeight * 0.25,

		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: backgroundColor,
	},
	profileName: {
		marginTop: reactiveHeight * 0.02,
		color: 'white',
	},
	point: {
		color: 'white',
	},
	reviewView: {
		paddingHorizontal: reactiveWidth * 0.05,
		marginBottom: reactiveHeight * 0.02,
	},
	noReview: {
		marginTop: reactiveHeight * 0.1,

		alignSelf: 'center',
		color: tagColor,
	},
});
