import React from 'react';
import { Button, Icon, Input, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import {
	darkGrey,
	grey,
	reactiveHeight,
	reactiveScreen,
	reactiveWidth,
	whiteGrey,
} from 'Commons/variables';

type Props = {
	searchText: string;
	onChangeSearch: (text: string) => void;
	onPressSearch: () => void;
	onPressMyPage?: () => void;
	isMyPage?: boolean;
};

const SearchBar: React.FC<Props> = ({
	searchText,
	onChangeSearch,
	onPressSearch,
	onPressMyPage,
	isMyPage = false,
}) => {
	return (
		<View style={styles.rootView}>
			<View style={styles.searchView}>
				<Button
					style={styles.searchBt}
					icon
					transparent
					onPress={onPressSearch}
				>
					<Icon style={styles.searchIcon} name={'search'} />
					<Text style={styles.searchText}>검색</Text>
				</Button>
				<Input
					style={styles.searchInput}
					placeholderTextColor={'#A4A4A4'}
					placeholder={'검색어를 입력하세요'}
					onChangeText={onChangeSearch}
					onSubmitEditing={onPressSearch}
					value={searchText}
				/>
			</View>
			{isMyPage ? (
				<Button style={styles.myBt} icon transparent onPress={onPressMyPage}>
					<Icon style={styles.myIcon} name={'person-circle'} />
					<Text style={styles.myText}>MY</Text>
				</Button>
			) : null}
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	rootView: {
		flexDirection: 'row',

		height: reactiveHeight * 0.08,
		paddingHorizontal: reactiveWidth * 0.02,
		paddingVertical: reactiveHeight * 0.01,
	},
	searchView: {
		flex: 10,

		flexDirection: 'row',
		alignItems: 'center',

		borderRadius: 8,
		backgroundColor: whiteGrey,
	},
	searchInput: {
		flex: 8,
		fontSize: reactiveScreen * 0.02,
	},
	searchBt: {
		flex: 1,
		height: '100%',

		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchIcon: {
		fontSize: reactiveScreen * 0.025,

		width: '50%',
		color: grey,
	},

	searchText: {
		color: grey,
		fontSize: reactiveScreen * 0.012,
	},

	myBt: {
		flex: 1,

		height: '100%',
		marginHorizontal: reactiveWidth * 0.005,

		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	myIcon: {
		fontSize: reactiveScreen * 0.035,
		color: '#848484',

		width: '70%',
		height: '65%',
	},
	myText: {
		fontSize: reactiveScreen * 0.012,
		fontWeight: 'bold',
		color: darkGrey,
	},
});
