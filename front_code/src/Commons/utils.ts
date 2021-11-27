import { GeoType, ReviewType, StoreType } from 'types';

export const storesByText = (
	stores: StoreType[],
	text: string,
	centerPos: GeoType,
): StoreType[] => {
	const retStores: StoreType[] = [];

	stores.forEach((store) => {
		let isHave = false;

		if (store.name.replace(/ /g, '').includes(text)) {
			isHave = true;
		}

		if (isHave) {
			retStores.push(store);
		}
	});

	return retStores.sort((store1, store2) => {
		const store1Pos = {
			latitude: store1.latitude,
			longitude: store1.longitude,
		};
		const store2Pos = {
			latitude: store2.latitude,
			longitude: store2.longitude,
		};

		const dis1 = getDistance(store1Pos, centerPos);
		const dis2 = getDistance(store2Pos, centerPos);

		if (dis1 > dis2) {
			return 1;
		} else if (dis1 === dis2) {
			return 0;
		} else {
			return -1;
		}
	});
};

export const getDistance = (position1: GeoType, position2: GeoType): number => {
	const { latitude: lat1, longitude: long1 } = position1;
	const { latitude: lat2, longitude: long2 } = position2;

	function deg2rad(deg: number) {
		return deg * (Math.PI / 180);
	}
	var R = 6371;
	var dLat = deg2rad(lat2 - lat1);
	var dLon = deg2rad(long2 - long1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = Math.floor(R * c * 100) / 100;

	return d;
};

export const disToStr = (dis: number): string => {
	return dis < 1 ? `${dis * 1000}m` : `${dis}km`;
};

const shuffle = (a: any[]) => {
	var j, x, i;
	for (i = a.length; i; i -= 1) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
};

export const getRandomReviews = (stores: StoreType[]) => {
	const reviews: ReviewType[] = [];

	stores.forEach((store) => {
		store.reviews.forEach((review) => {
			reviews.push(review);
		});
	});

	shuffle(reviews);

	return reviews.slice(0, 4);
};

export const getMyReviews = (stores: StoreType[], myId: string) => {
	const reviews: ReviewType[] = [];

	stores.forEach((store) => {
		store.reviews.forEach((review) => {
			if (review.user.loginId === myId) {
				reviews.push(review);
			}
		});
	});

	return reviews;
};
