import React, { useState } from 'react';
import { View, Text } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import {
	reactiveHeight,
	reactiveScreen,
	reactiveWidth,
	tagColor,
} from 'Commons/variables';
import { ReviewType } from 'types';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
	title: string;
	reviews: ReviewType[];
	onCreateReview?: () => void;
	onPressReview?: (storeId: number) => void;
};

const ImageComp = ({
	review,
	onPress,
}: {
	review: ReviewType;
	onPress?: (storeId: number) => void;
}) => {
	const [clicked, setClicked] = useState<boolean>(false);

	const onPressImage = () => {
		setClicked(!clicked);
	};

	return (
		<View style={styles.imageRoot}>
			<TouchableOpacity
				style={styles.reviews}
				activeOpacity={0.8}
				onPress={onPress ? onPress.bind(this, review.store.id) : onPressImage}
			>
				<Image
					style={styles.reviewImage}
					source={
						review.imageURL
							? { uri: review.imageURL }
							: require('assets/defaults/thumbnail.png')
					}
				/>
				{clicked ? (
					<View style={styles.textView}>
						<Text style={styles.text}>{review.text}</Text>
						<Text style={styles.authorText}>- {review.author} -</Text>
					</View>
				) : null}
			</TouchableOpacity>
			<Text style={styles.storeName}>{review.storeName}</Text>
		</View>
	);
};

const ReviewImage: React.FC<Props> = ({
	title,
	reviews,
	onCreateReview,
	onPressReview,
}) => {
	return (
		<View style={styles.rootView}>
			<View style={styles.reviewTopView}>
				<Text style={styles.reviewText}>{title}</Text>
				{onCreateReview ? (
					<Text style={styles.reviewBt} onPress={onCreateReview}>
						리뷰 작성하기
					</Text>
				) : null}
			</View>

			<View
				style={{
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
				}}
			>
				{reviews.map((review, index) => {
					return (
						<ImageComp review={review} onPress={onPressReview} key={index} />
					);
				})}
			</View>
		</View>
	);
};

export default ReviewImage;

const styles = StyleSheet.create({
	rootView: {
		flexDirection: 'column',

		marginVertical: reactiveHeight * 0.05,

		// marginHorizontal: reactiveWidth * 0.03,
	},
	imageRoot: {
		// borderWidth: 1,
	},
	reviews: {
		marginTop: reactiveHeight * 0.015,
		width: reactiveWidth * 0.4,
		height: reactiveWidth * 0.4,
	},
	reviewImage: {
		width: '100%',
		height: '100%',
		borderRadius: reactiveScreen * 0.015,
	},
	textView: {
		position: 'absolute',
		width: '100%',

		justifyContent: 'center',
		backgroundColor: '#00000099',

		bottom: 0,
		top: 0,

		borderRadius: reactiveScreen * 0.015,
	},
	text: {
		fontSize: reactiveScreen * 0.017,
		color: 'white',

		textAlign: 'center',
	},
	authorText: {
		fontSize: reactiveScreen * 0.01,
		color: 'white',

		textAlign: 'center',
		marginTop: reactiveHeight * 0.01,
	},
	storeName: {
		fontSize: reactiveScreen * 0.017,
	},
	reviewTopView: {
		flexDirection: 'row',
	},
	reviewText: {
		alignSelf: 'center',

		fontSize: reactiveScreen * 0.02,
		fontWeight: 'bold',
		color: tagColor,

		marginRight: reactiveWidth * 0.02,
	},
	reviewBt: {
		backgroundColor: tagColor,

		fontSize: reactiveScreen * 0.017,

		paddingHorizontal: reactiveWidth * 0.03,
		paddingVertical: reactiveHeight * 0.008,

		color: 'white',
		borderRadius: reactiveScreen * 0.005,

		elevation: 8,
	},
});
