import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, View } from 'native-base';
import { Text } from 'native-base';
import {
	reactiveHeight,
	reactiveScreen,
	reactiveWidth,
} from 'Commons/variables';

type Props = {
	selectedType: string;
	onPressActionButton: (actionType: string) => void;
};

const MyTabButtonList: React.FC<Props> = ({
	selectedType,
	onPressActionButton,
}) => {
	const tabs = [
		{
			text: 'Tumbler',
			type: 'Tumbler',
		},
		// {
		// 	text: 'BMW',
		// 	type: 'BMW',
		// },
	];

	return (
		<View style={styles.rootContainer}>
			{tabs.map(({ text, type }, index) => {
				return (
					<View style={styles.buttonView} key={index}>
						<Button
							small
							style={
								selectedType === type
									? styles.button_checked
									: styles.button_unchecked
							}
							onPress={onPressActionButton.bind(this, type)}
						>
							<Text style={styles.buttonText} uppercase={false}>
								{text}
							</Text>
						</Button>
					</View>
				);
			})}
		</View>
	);
};

export default MyTabButtonList;

const styles = StyleSheet.create({
	rootContainer: {
		flexDirection: 'row',
		paddingHorizontal: reactiveWidth * 0.01,
		paddingTop: reactiveHeight * 0.005,
	},
	buttonView: {
		paddingHorizontal: reactiveWidth * 0.01,
	},
	button_unchecked: {
		borderRadius: reactiveScreen * 0.005,
		backgroundColor: 'gray',

		paddingHorizontal: reactiveWidth * 0.02,

		height: reactiveHeight * 0.04,
	},
	button_checked: {
		borderRadius: reactiveScreen * 0.005,
		backgroundColor: 'palevioletred',

		paddingHorizontal: reactiveWidth * 0.02,

		height: reactiveHeight * 0.04,
	},
	buttonText: {
		fontSize: reactiveScreen * 0.013,
		fontWeight: 'bold',
	},
});
