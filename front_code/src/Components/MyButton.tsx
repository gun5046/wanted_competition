import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import {
	primaryColor,
	reactiveHeight,
	reactiveScreen,
} from 'Commons/variables';

type Props = {
	text: string;
	buttonColor?: string;
	textColor?: string;
	onPress: () => void;
};

const MyButton: React.FC<Props> = ({
	text,
	buttonColor,
	textColor,
	onPress,
}) => {
	return (
		<Button
			style={{ ...styles.button, backgroundColor: buttonColor || primaryColor }}
			onPress={onPress}
		>
			<Text style={{ ...styles.text, color: textColor || 'black' }}>
				{text}
			</Text>
		</Button>
	);
};

export default MyButton;

const styles = StyleSheet.create({
	button: {
		width: '100%',
		justifyContent: 'center',
		height: reactiveHeight * 0.055,
		borderRadius: reactiveScreen * 0.05,

		marginVertical: reactiveHeight * 0.025,
	},
	text: {
		fontWeight: 'bold',
		color: 'black',
	},
});
