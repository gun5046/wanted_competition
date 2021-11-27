import React, { useState, useEffect } from 'react';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

// 현재 위치 정보 권한 요청
const requestPermission = async () => {
	try {
		if (Platform.OS === 'ios') {
			return await Geolocation.requestAuthorization('always');
		}

		if (Platform.OS === 'android') {
			return await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			);
		}
	} catch (e) {
		console.log(e);
	}
};

//사용자 현재 위치 반환
const usePosition = () => {
	const [location, setLocation] = useState<GeoCoordinates>();

	useEffect(() => {
		requestPermission().then((result) => {
			// console.log({ result });

			if (result === 'granted') {
				Geolocation.getCurrentPosition(
					(pos) => {
						// console.log('pos 는 : ', pos);
						setLocation(pos.coords);
					},
					(error) => {
						console.log(error);
					},
					{
						enableHighAccuracy: true,
						timeout: 3600,
						maximumAge: 3600,
					},
				);
			}
		});
	}, []);

	return location;
};

export default usePosition;
