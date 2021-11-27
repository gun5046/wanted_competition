import React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import {
	grey,
	reactiveHeight,
	reactiveScreen,
	reactiveWidth,
} from 'Commons/variables';
import { GeoType, StoreType } from 'types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getDistance, disToStr } from 'Commons/utils';

type Props = {
	store: StoreType;
	nowPos: GeoType;
	onPressStore: (store: StoreType) => void;
};

const StoreComp: React.FC<Props> = ({ store, nowPos, onPressStore }) => {
	const storePos = {
		latitude: store.latitude,
		longitude: store.longitude,
	};
	return (
		<TouchableOpacity
			style={styles.rootView}
			onPress={onPressStore.bind(this, store)}
			activeOpacity={0.8}
		>
			<Image
				style={styles.storeImage}
				source={
					store.imageURL !== ''
						? {
								uri: store.imageURL,
						  }
						: require('assets/defaults/thumbnail.png')
				}
			/>
			<View style={styles.infoView}>
				<Text style={styles.storeName}>{store.name}</Text>
				<Text style={styles.storeAddress}>{store.address}</Text>
				<View style={styles.storeDistanceView}>
					<Text style={styles.storeDistance}>
						{disToStr(getDistance(storePos, nowPos))}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default StoreComp;

const styles = StyleSheet.create({
	rootView: {
		flexDirection: 'row',

		marginHorizontal: reactiveWidth * 0.05,
		marginVertical: reactiveHeight * 0.015,
	},
	storeImage: {
		borderRadius: reactiveScreen * 0.015,

		width: reactiveScreen * 0.14,
		height: reactiveScreen * 0.14,
	},
	infoView: {
		flex: 1,

		marginLeft: reactiveWidth * 0.02,
		padding: reactiveScreen * 0.005,
	},
	storeName: {
		fontSize: reactiveScreen * 0.018,
		fontWeight: 'bold',
	},
	storeAddress: {
		marginTop: reactiveHeight * 0.01,

		fontSize: reactiveScreen * 0.012,
		fontWeight: 'bold',

		color: grey,
	},
	storeDistanceView: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	storeDistance: {
		alignSelf: 'flex-end',
	},
});
