import React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import {
	reactiveHeight,
	reactiveScreen,
	reactiveWidth,
	tagColor,
} from 'Commons/variables';
import { StoreType } from 'types';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
	stores: StoreType[];
	header: string;
	onPressStore: (store: StoreType) => void;
};

const TaggedStore: React.FC<Props> = ({ stores, header, onPressStore }) => {
	return (
		<View style={styles.rootView}>
			<View style={styles.topView}>
				<Text style={styles.headLine}>{header}</Text>
			</View>
			<View style={styles.bottomView}>
				{stores.slice(0, 2).map((store, index) => {
					return (
						<TouchableOpacity
							onPress={onPressStore.bind(this, stores[index])}
							activeOpacity={0.8}
							key={index}
						>
							<View>
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
							</View>
							<Text style={styles.storeText}>{store.name}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

export default TaggedStore;

const styles = StyleSheet.create({
	rootView: {
		marginHorizontal: reactiveWidth * 0.05,
	},
	topView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headLine: {
		flex: 4.5,

		fontSize: reactiveScreen * 0.021,
		fontWeight: 'bold',
	},
	bottomView: {
		flexDirection: 'row',

		justifyContent: 'space-between',

		marginVertical: reactiveHeight * 0.015,
	},
	storeImageText: {
		color: tagColor,
		fontSize: reactiveScreen * 0.01,
		fontWeight: 'bold',

		backgroundColor: 'white',

		borderRadius: 8,

		paddingHorizontal: reactiveWidth * 0.015,
		paddingVertical: reactiveHeight * 0.005,

		marginHorizontal: reactiveWidth * 0.005,

		elevation: 8,
	},
	storeImage: {
		borderRadius: reactiveScreen * 0.015,

		width: reactiveScreen * 0.2,
		height: reactiveScreen * 0.2,
	},
	storeText: {
		marginLeft: reactiveWidth * 0.01,
		marginTop: reactiveHeight * 0.01,

		fontSize: reactiveScreen * 0.016,
		fontWeight: 'bold',
	},
});
