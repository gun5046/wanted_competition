import React from 'react';
import { Text, Textarea, View, Icon } from 'native-base';
import Modal from 'react-native-modal';
import { StyleSheet, Image, Keyboard } from 'react-native';
import {
	backgroundColor,
	reactiveHeight,
	reactiveScreen,
	reactiveWidth,
	tagColor,
} from 'Commons/variables';

type Props = {
	open: boolean;
	review: string;
	onChangeReview: (text: string) => void;
	onSubmitReview: () => void;
	onCloseReview: () => void;
	onPressReviewImage: () => void;
};

const ReviewPopup: React.FC<Props> = ({
	open,
	review,
	onChangeReview,
	onSubmitReview,
	onCloseReview,
	onPressReviewImage,
}) => {
	return (
		<Modal
			isVisible={open}
			style={styles.popup}
			onBackdropPress={Keyboard.dismiss}
			onBackButtonPress={onCloseReview}
		>
			<View style={styles.rootContainer}>
				<View style={styles.closeView} onTouchEnd={onCloseReview}>
					<Icon name="close" style={styles.closeBt} />
				</View>
				<View style={styles.inputWrapper}>
					<View style={styles.imageView} onTouchEnd={onPressReviewImage}>
						<Image
							style={styles.image}
							resizeMode="stretch"
							source={require('assets/defaults/thumbnail.png')}
						/>
					</View>
					<Textarea
						value={review}
						style={styles.textarea}
						placeholder={'리뷰를 작성해 주세요.'}
						onChangeText={onChangeReview}
					/>
				</View>
				<View style={styles.submitBt} onTouchEnd={onSubmitReview}>
					<Text style={styles.submitText}>작성완료</Text>
				</View>
			</View>
		</Modal>
	);
};

export default ReviewPopup;

const styles = StyleSheet.create({
	popup: {
		alignItems: 'center',
	},
	rootContainer: {
		width: '100%',
		height: reactiveHeight * 0.6,

		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: backgroundColor,

		borderRadius: reactiveScreen * 0.03,

		// padding: reactiveHeight * 0.01,
	},
	inputWrapper: {
		flex: 6,
		width: '100%',
		padding: reactiveHeight * 0.025,
		paddingTop: 0,
	},
	imageView: {
		width: '100%',
		height: '50%',

		marginVertical: reactiveHeight * 0.03,
		marginTop: 0,
	},
	image: {
		width: '100%',
		height: '100%',

		// borderRadius: reactiveScreen * 0.02,
	},
	textarea: {
		width: '100%',
		height: '40%',

		fontSize: reactiveScreen * 0.02,
		backgroundColor: 'white',

		// padding: reactiveScreen * 0.02,
		marginBottom: reactiveHeight * 0.02,
		// borderRadius: reactiveScreen * 0.02,

		// borderWidth: 1,
	},
	closeView: {
		alignSelf: 'flex-end',
		marginRight: reactiveWidth * 0.02,
	},
	closeBt: {
		color: 'white',
	},
	submitBt: {
		backgroundColor: tagColor,
		elevation: 8,

		paddingVertical: reactiveHeight * 0.01,
		paddingHorizontal: reactiveWidth * 0.05,
		marginBottom: reactiveHeight * 0.025,

		borderRadius: reactiveScreen * 0.005,
	},
	submitText: {
		fontSize: reactiveScreen * 0.018,
		color: 'white',
	},
});
