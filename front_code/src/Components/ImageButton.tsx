import React from 'react';
import {
	TouchableOpacity,
	Image,
	ImageSourcePropType,
	ImageResizeMode,
	StyleProp,
	ViewStyle,
	ImageStyle,
} from 'react-native';

type Props = {
	source: ImageSourcePropType;
	onPress: () => void;
	resizeMode?: ImageResizeMode;
	buttonStyle?: StyleProp<ViewStyle>;
	imageStyle?: StyleProp<ImageStyle>;
};

const ImageButton: React.FC<Props> = ({
	source,
	onPress,
	resizeMode,
	buttonStyle,
	imageStyle,
}) => {
	return (
		<TouchableOpacity activeOpacity={0.8} style={buttonStyle} onPress={onPress}>
			<Image source={source} style={imageStyle} resizeMode={resizeMode} />
		</TouchableOpacity>
	);
};

export default ImageButton;
