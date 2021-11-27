import React from 'react';
import { StyleSheet } from 'react-native';
import NaverMapView, { Marker } from 'react-native-nmap';
import { GeoType, StoreType } from 'types';
import { getDistance } from 'Commons/utils';
import { reactiveScreen } from 'Commons/variables';

type Props = {
	stores: StoreType[];
	centerPos: GeoType;
};

const minDistance = 1; // 지도 표시 최소 거리 (km)

const NaverMap: React.FC<Props> = ({ stores, centerPos }) => {
	return (
		<NaverMapView
			style={styles.mapView}
			center={{ ...centerPos, zoom: 13 }}
			// onTouch={() => {}}
			// onCameraChange={(e) => {}}
			// onMapClick={(e) => {}}
			zoomControl={false}
		>
			{/* <Marker coordinate={nowPos} onClick={() => console.warn('onClick! p0')} /> */}
			{stores
				.filter((store) => {
					const storePos = {
						latitude: store.latitude,
						longitude: store.longitude,
					};
					return getDistance(storePos, centerPos) <= minDistance;
				})
				.map((store, index) => {
					const storePos = {
						latitude: store.latitude,
						longitude: store.longitude,
					};
					return (
						<Marker
							coordinate={storePos}
							pinColor="blue"
							height={reactiveScreen * 0.04}
							width={reactiveScreen * 0.04}
							caption={{ text: store.name }}
							key={index}
						/>
					);
				})}
		</NaverMapView>
	);
};

export default NaverMap;

const styles = StyleSheet.create({
	mapView: {
		width: '100%',
		height: '100%',
	},
});
