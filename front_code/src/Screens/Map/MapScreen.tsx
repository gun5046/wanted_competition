import { reactiveHeight, reactiveWidth } from 'Commons/variables';
import NaverMap from 'Components/NaverMap';
import SearchBar from 'Components/SearchBar';
import StoreComp from 'Components/StoreComp';
import { View } from 'native-base';
import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { GeoType, StoreType } from 'types';

type Props = {
	stores: StoreType[];
	searchText: string;
	nowPos: GeoType;
	onChangeSearch: (text: string) => void;
	onPressSearch: () => void;
	onPressStore: (store: StoreType) => void;
};

const MapScreen: React.FC<Props> = ({
	stores,
	searchText,
	nowPos,
	onChangeSearch,
	onPressSearch,
	onPressStore,
}) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<ScrollView style={styles.scrollView}>
				<SearchBar
					searchText={searchText}
					onChangeSearch={onChangeSearch}
					onPressSearch={onPressSearch}
				/>
				<View style={styles.mapView}>
					<NaverMap
						stores={stores}
						centerPos={
							searchText === '' || stores.length === 0
								? nowPos
								: {
										latitude: stores[0].latitude,
										longitude: stores[0].longitude,
								  }
						}
					/>
				</View>

				<View style={styles.storeView}>
					{stores.map((store, index) => {
						return (
							<StoreComp
								store={store}
								nowPos={nowPos}
								onPressStore={onPressStore}
								key={index}
							/>
						);
					})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: '#fff',
		// paddingTop: Platform.OS === 'ios' ? reactiveHeight * 0.02 : 0,
	},
	scrollView: {
		flex: 1,
	},
	mapView: {
		height: reactiveHeight * 0.28,
	},
	storeView: {
		marginTop: reactiveHeight * 0.03,
		marginHorizontal: reactiveWidth * 0.03,
	},
});
