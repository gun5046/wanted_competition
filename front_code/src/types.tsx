// import { RouteProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageSourcePropType } from 'react-native';

type RootStackParamList = {
	Home: undefined;
	Login: undefined;
	My: undefined;
	BottomTab: undefined;
	Map: { text: string };
	Detail: { store: StoreType };
	QRScreen: undefined;
};

// 홈 스크린
export type HomeNavProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;

// 로그인 스크린
export type LoginNavProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

// 유저 다이어리 스크린
export type MyNavProp = StackNavigationProp<RootStackParamList, 'My'>;
export type MyRouteProp = RouteProp<RootStackParamList, 'My'>;

// 검색 스크린
export type MapNavProp = StackNavigationProp<RootStackParamList, 'Map'>;
export type MapRouteProp = RouteProp<RootStackParamList, 'Map'>;

// 가게 상세 스크린
export type DetailNavProp = StackNavigationProp<RootStackParamList, 'Detail'>;
export type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

// QR 스크린
export type QRScreenNavProp = StackNavigationProp<
	RootStackParamList,
	'QRScreen'
>;
export type QRScreenRouteProp = RouteProp<RootStackParamList, 'QRScreen'>;

// 인증 캐러셀 아이템 타입
export type CertCarouselItemType = {
	src: ImageSourcePropType;
	type: string;
};

export type HomeQueryType = {
	getAllStore: StoreType[];
};

export type MyGraphqlError = {
	graphQLErrors: {
		extensions: {
			errorCode: number;
			errorMessage: string;
		};
	}[];
};

export type MenuType = {
	name: string;
	imageURL: string;
};

export type ReviewType = {
	text: string;
	author: string;
	storeName: string;
	imageURL: string;
	store: {
		id: number;
	};
	user: {
		loginId: string;
	};
};

export type StoreType = {
	id: number;
	name: string;
	imageURL: string;
	address: string;
	ph: string;
	latitude: number;
	longitude: number;
	menus: MenuType[];
	reviews: ReviewType[];
};

export type GeoType = {
	latitude: number;
	longitude: number;
};
