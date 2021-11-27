import React, { useState, useEffect } from 'react';
import MapScreen from './MapScreen';
import { GeoType, MapNavProp, MapRouteProp, StoreType } from 'types';
import { storesByText } from 'Commons/utils';
import Geolocation from '@react-native-community/geolocation';
import { useReactiveVar } from '@apollo/client';
import storeState from 'store/StoreState';

type Props = {
	navigation: MapNavProp;
	route: MapRouteProp;
};

const initGeo = {
	latitude: 37.564362,
	longitude: 126.977011,
};

const MapContainer: React.FC<Props> = ({ navigation, route }) => {
	const { stores, searchText, setSearchText } = useReactiveVar(storeState);

	const { text: prevText } = route.params || { text: '' };
	const [filterStores, setFilterStores] = useState<StoreType[]>([]);

	const [nowPos, setNowPos] = useState<GeoType>(initGeo);

	useEffect(() => {
		Geolocation.getCurrentPosition(
			(position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;

				setNowPos({ latitude, longitude });
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	}, []);

	useEffect(() => {
		setSearchText(prevText);
	}, [prevText, setSearchText]);

	useEffect(() => {
		setFilterStores(storesByText(stores, searchText, nowPos));
	}, [searchText, stores, nowPos]);

	const onChangeSearch = (text: string) => {
		setSearchText(text);
	};

	const onPressSearch = () => {
		setFilterStores(storesByText(stores, searchText, nowPos));
	};

	const onPressStore = (store: StoreType) => {
		navigation.navigate('Detail', { store });
	};

	return (
		<MapScreen
			stores={filterStores}
			searchText={searchText}
			nowPos={nowPos}
			onChangeSearch={onChangeSearch}
			onPressSearch={onPressSearch}
			onPressStore={onPressStore}
		/>
	);
};

export default MapContainer;
