import React from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, View, Image } from 'react-native';

type Props = {
	visible: boolean;
	uri: string;
	closeImagePopup?: () => void;
};

const ImagePopup: React.FC<Props> = ({ visible, uri, closeImagePopup }) => {
	return (
		<Modal
			isVisible={visible}
			style={styles.popup}
			animationIn="slideInDown"
			onTouchEnd={closeImagePopup}
			onBackButtonPress={closeImagePopup}
		>
			<View style={styles.rootView}>
				<Image source={{ uri }} style={styles.image} resizeMode="contain" />
			</View>
		</Modal>
	);
};

export default ImagePopup;

const styles = StyleSheet.create({
	popup: {
		flex: 1,
	},
	rootView: {
		width: '100%',
		height: '100%',
	},
	image: {
		flex: 1,
	},
});
