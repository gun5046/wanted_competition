import React from 'react';
import { Container, Text, View } from 'native-base';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { StoreType } from 'types';
import {
	reactiveHeight,
	reactiveScreen,
	reactiveWidth,
	tagColor,
} from 'Commons/variables';
import NaverMap from 'Components/NaverMap';
import ReviewPopup from 'Components/ReviewPopup';
import ReviewImage from 'Components/ReviewImage';

type Props = {
	store: StoreType;
	review: string;
	reviewOpen: boolean;
	onChangeReview: (text: string) => void;
	onSubmitReview: () => void;
	onCreateReview: () => void;
	onCloseReview: () => void;
	onPressReviewImage: () => void;
};

const DetailScreen: React.FC<Props> = ({
	store,
	review,
	reviewOpen,
	onChangeReview,
	onSubmitReview,
	onCreateReview,
	onCloseReview,
	onPressReviewImage,
}) => {
	return (
		<Container style={styles.container}>
			<ScrollView>
				<View style={styles.storeImageView}>
					<Image
						source={{ uri: store.imageURL }}
						style={styles.storeImage}
						resizeMode={'stretch'}
					/>
				</View>
				<View style={styles.storeInfoWrapper}>
					<View style={styles.storeMainInfoView}>
						<View style={styles.storeInfoView}>
							<Text style={styles.storeInfo1}>매장 주소 : </Text>
							<Text style={styles.storeInfo2}>{store.address}</Text>
						</View>
						<View style={styles.storeInfoView}>
							<Text style={styles.storeInfo1}>전화번호 : </Text>
							<Text style={styles.storeInfo2}>{store.ph}</Text>
						</View>
					</View>
					<View style={styles.storeMenuView}>
						<View style={styles.menuTopView}>
							<Text style={styles.storeMainText}>대표 메뉴 </Text>
						</View>
						<View style={styles.menuImagesView}>
							{store.menus.map((menu, index) => {
								return (
									<View style={styles.menus} key={index}>
										<Image
											style={styles.menuImage}
											source={{ uri: menu.imageURL }}
										/>
										<Text
											style={{
												fontSize: reactiveScreen * 0.018,
												marginTop: reactiveHeight * 0.01,
											}}
										>
											{menu.name}
										</Text>
									</View>
								);
							})}
						</View>
					</View>
					<View style={styles.storeMapView}>
						<Text style={{ ...styles.storeMainText, alignSelf: 'flex-start' }}>
							매장 위치
						</Text>
						<NaverMap
							stores={[store]}
							centerPos={{
								latitude: store.latitude,
								longitude: store.longitude,
							}}
						/>
					</View>
					<View>
						<ReviewImage
							title={'가치있는 커피생활을 공유해요!'}
							reviews={store.reviews}
							onCreateReview={onCreateReview}
						/>
					</View>
				</View>
			</ScrollView>
			<ReviewPopup
				open={reviewOpen}
				review={review}
				onChangeReview={onChangeReview}
				onSubmitReview={onSubmitReview}
				onCloseReview={onCloseReview}
				onPressReviewImage={onPressReviewImage}
			/>
		</Container>
	);
};

export default DetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	storeImageView: {
		height: reactiveHeight * 0.3,
	},
	storeImage: {
		width: '100%',
		height: '100%',
	},
	storeInfoWrapper: {
		paddingHorizontal: reactiveScreen * 0.02,
	},
	storeMainInfoView: {
		marginTop: reactiveHeight * 0.01,
	},
	storeInfoView: {
		flexDirection: 'row',
		marginBottom: reactiveHeight * 0.02,
	},
	storeInfo1: {
		fontWeight: 'bold',
		fontSize: reactiveScreen * 0.015,
	},
	storeInfo2: {
		fontSize: reactiveScreen * 0.015,
		marginLeft: reactiveWidth * 0.005,
	},
	storeMenuView: {
		marginBottom: reactiveHeight * 0.02,
	},
	menuTopView: {
		flexDirection: 'row',
	},
	menuImagesView: {
		marginTop: reactiveHeight * 0.01,
		flexDirection: 'row',
	},
	menuImage: {
		width: reactiveHeight * 0.17,
		height: reactiveHeight * 0.17,
		borderRadius: reactiveScreen * 0.015,
	},
	menus: {
		marginHorizontal: reactiveWidth * 0.02,
		width: '30%',
	},
	storeMainText: {
		alignSelf: 'center',

		fontSize: reactiveScreen * 0.02,
		fontWeight: 'bold',
		color: tagColor,

		marginRight: reactiveWidth * 0.02,
	},
	storeMapView: {
		height: reactiveHeight * 0.2,
	},
});
