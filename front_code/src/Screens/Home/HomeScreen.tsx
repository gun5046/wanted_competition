import React from 'react';
import { View } from 'native-base';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import {
	reactiveHeight,
	reactiveScreen,
	reactiveWidth,
	tagColor,
	whiteGrey,
} from 'Commons/variables';
import { StoreType } from 'types';
import TaggedStore from 'Components/TaggedStore';
import { getRandomReviews } from 'Commons/utils';
import SearchBar from 'Components/SearchBar';
import ReviewImage from 'Components/ReviewImage';

type Props = {
	stores: StoreType[];
	searchText: string;
	onChangeSearch: (text: string) => void;
	onPressSearch: () => void;
	onPressMyPage: () => void;
	onPressStore: (store: StoreType) => void;
	onPressReview: (storeId: number) => void;
};

const HomeScreen: React.FC<Props> = ({
	stores,
	searchText,
	onChangeSearch,
	onPressSearch,
	onPressMyPage,
	onPressStore,
	onPressReview,
}) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView style={styles.scrollView}>
				<SearchBar
					searchText={searchText}
					onChangeSearch={onChangeSearch}
					onPressMyPage={onPressMyPage}
					onPressSearch={onPressSearch}
					isMyPage
				/>

				<View style={styles.taggedStore}>
					<TaggedStore
						stores={stores}
						header={'텀블러쓰고 할인 어떠신가요?'}
						onPressStore={onPressStore}
					/>
				</View>

				<View style={styles.divider} />

				<View style={styles.reviewView}>
					<ReviewImage
						title={'가치있는 커피생활을 공유해요!'}
						reviews={getRandomReviews(stores)}
						onPressReview={onPressReview}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: '#fff',
		// paddingTop: Platform.OS === 'ios' ? reactiveHeight * 0.02 : 0,
	},
	scrollView: {
		flex: 1,
	},
	tagListView: {
		marginVertical: reactiveHeight * 0.01,
	},
	bannerView: {
		marginVertical: reactiveHeight * 0.01,
	},
	taggedStore: {
		marginTop: reactiveHeight * 0.03,
	},
	divider: {
		width: '100%',
		borderTopWidth: 0.5,
		borderTopColor: whiteGrey,
	},
	reviewView: {
		marginHorizontal: reactiveWidth * 0.05,
		marginBottom: reactiveHeight * 0.02,
	},
	reviewText: {
		fontSize: reactiveScreen * 0.02,
		fontWeight: 'bold',
		color: tagColor,

		marginRight: reactiveWidth * 0.02,
	},
});
