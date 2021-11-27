// 안드로이드 애뮬레이터에선 localhost가 먹히지 않음 -> 서버의 ip를 직접 입력

import { Dimensions } from 'react-native';

export const apiServerAddress =
	process.env.NODE_ENV === 'development'
		? 'http://192.168.56.1:8080/graphql'
		: 'http://3.36.90.153:8080/graphql';

// 로컬 테스트용
// export const apiServerAddress = 'http://192.168.56.1:8080/graphql';

// 배포 서버
// export const apiServerAddress = 'https://api.addvalue.kr/graphql';

// 테스트 서버
// export const apiServerAddress = 'http://3.36.90.153:8080/graphql';

// export const apiServerAddress = 'http://172.30.1.44:8080/graphql';

export const reactiveWidth = Dimensions.get('screen').width;
export const reactiveHeight = Dimensions.get('screen').height;
export const reactiveScreen = Math.sqrt(
	reactiveWidth * reactiveWidth + reactiveHeight * reactiveHeight,
);

export const primaryColor = 'gold';
export const tagColor = '#6200EE';
export const backgroundColor = '#4921FF';
export const whiteGrey = '#E6E6E6';
export const grey = '#A4A4A4';
export const darkGrey = '#848484';
