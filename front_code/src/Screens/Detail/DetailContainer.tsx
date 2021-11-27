import React, { useEffect, useState } from 'react';
import DetailScreen from './DetailScreen';
import { DetailRouteProp, ReviewType, StoreType } from 'types';
import { useMutation, useReactiveVar } from '@apollo/client';
import { userState } from 'store';
import { INSERT_REVIEW } from 'Commons/mutations';
import {
	ImageLibraryOptions,
	launchImageLibrary,
} from 'react-native-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import storeState from 'store/StoreState';

type Props = {
	route: DetailRouteProp;
};

const pictureOptions: ImageLibraryOptions = {
	mediaType: 'photo',
};

const generateRNFile = (
	uri: string = '',
	name: string = '',
	fileType: string = '',
) => {
	return new ReactNativeFile({
		uri,
		type: fileType,
		name,
	});
};

const DetailContainer: React.FC<Props> = ({ route }) => {
	const { userInfo } = useReactiveVar(userState);
	const { stores, updateStore } = useReactiveVar(storeState);

	const [insertReview] = useMutation(INSERT_REVIEW);

	const [store, setStore] = useState<StoreType>(route.params.store);

	const [reviewOpen, setReviewOpen] = useState<boolean>(false);
	const [review, setReview] = useState<string>('');
	const [reviewImage, setReviewImage] = useState<ReactNativeFile>();

	useEffect(() => {
		const newStore = stores.find((st) => {
			return st.id === store.id;
		});

		if (newStore) {
			setStore(newStore);
		}
	}, [store.id, stores]);

	const onCreateReview = () => {
		setReviewOpen(true);
	};

	const onPressReviewImage = () => {
		//앨범 선택
		launchImageLibrary(pictureOptions, (image) => {
			if (!image.didCancel) {
				setReviewImage(generateRNFile(image.uri, image.fileName, image.type));
			}
		});
	};

	const onCloseReview = () => {
		setReviewOpen(false);
	};

	const onChangeReview = (text: string) => {
		setReview(text);
	};

	const onSubmitReview = () => {
		insertReview({
			variables: {
				text: review,
				reviewImage,
				storeId: store.id,
				loginId: userInfo ? userInfo.loginId : -1,
			},
		}).then((res) => {
			const insertedReview: ReviewType = res.data.insertReview;

			const newStore = {
				...store,
				reviews: [...store.reviews, insertedReview],
			};
			updateStore(newStore);

			setReviewOpen(false);
		});
	};

	return (
		<DetailScreen
			store={store}
			review={review}
			reviewOpen={reviewOpen}
			onChangeReview={onChangeReview}
			onSubmitReview={onSubmitReview}
			onCreateReview={onCreateReview}
			onCloseReview={onCloseReview}
			onPressReviewImage={onPressReviewImage}
		/>
	);
};

export default DetailContainer;
