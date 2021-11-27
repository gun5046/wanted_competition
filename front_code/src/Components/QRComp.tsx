import { useMutation, useReactiveVar } from '@apollo/client';
import { GIVE_POINT } from 'Commons/mutations';
import React from 'react';
import { StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { userState } from 'store';

type Props = {};

const QRComp: React.FC<Props> = ({ navigation }) => {
	const [givePoint] = useMutation(GIVE_POINT);
	const { userInfo } = useReactiveVar(userState);

	const onSuccess = (e) => {
		console.log(e);
		if (e.data === 'success') {
			givePoint({
				variables: {
					loginId: userInfo?.loginId || '',
				},
			}).then((res) => {
				const success = res.data.givePoint;

				if (success) {
					navigation.navigate('QRScreen');
				}
			});
		}
	};

	return (
		<QRCodeScanner
			onRead={onSuccess}
			showMarker={true}
			checkAndroid6Permissions={true}
		/>
	);
};

export default QRComp;
