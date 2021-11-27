import React, { useState, useEffect } from 'react';
import HomeScreen from './HomeScreen';
import { HomeNavProp, HomeQueryType, StoreType } from 'types';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_HOME_INFO } from 'Commons/queries';
import storeState from 'store/StoreState';

type Props = {
	navigation: HomeNavProp;
};

const HomeContainer: React.FC<Props> = ({ navigation }) => {
	const { stores, setStores } = useReactiveVar(storeState);

	const {
		data: homeInfo,
		loading: homeLoading,
		error: homeError,
	} = useQuery<HomeQueryType>(GET_HOME_INFO);

	const [searchText, setSearchText] = useState<string>('');

	useEffect(() => {
		if (!homeLoading && homeInfo) {
			setStores(homeInfo.getAllStore);
		} else {
			console.log(homeError);
		}
	}, [homeInfo, homeLoading, homeError, setStores]);

	const onChangeSearch = (text: string) => {
		setSearchText(text);
	};

	const onPressSearch = () => {
		setSearchText('');
		navigation.navigate('Map', { text: searchText });
	};

	const onPressMyPage = () => {
		setSearchText('');
		navigation.navigate('My');
	};

	const onPressStore = (store: StoreType) => {
		setSearchText('');
		navigation.navigate('Detail', { store });
	};

	const onPressReview = (storeId: number) => {
		const store = stores.filter((st) => {
			return st.id === storeId;
		});

		setSearchText('');
		navigation.navigate('Detail', { store: store[0] });
	};

	return (
		<HomeScreen
			stores={stores}
			searchText={searchText}
			onChangeSearch={onChangeSearch}
			onPressSearch={onPressSearch}
			onPressMyPage={onPressMyPage}
			onPressStore={onPressStore}
			onPressReview={onPressReview}
		/>
	);
};

export default HomeContainer;
