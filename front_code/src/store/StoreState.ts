import { makeVar } from '@apollo/client';
import { StoreType } from 'types';

export type StoreStateType = {
	stores: StoreType[];
	searchText: string;
	setStores: (newStores: StoreType[]) => void;
	setSearchText: (text: string) => void;
	updateStore: (store: StoreType) => void;
};

const setStores = (newStores: StoreType[]) => {
	const prevState = storeState();

	storeState({ ...prevState, stores: newStores });
};

const setSearchText = (text: string) => {
	const prevState = storeState();

	storeState({ ...prevState, searchText: text });
};

const updateStore = (store: StoreType) => {
	const prevState = storeState();
	const prevStore = prevState.stores;

	const newStores = prevStore.map((st) => {
		if (st.id === store.id) {
			return store;
		}
		return st;
	});

	storeState({ ...prevState, stores: newStores });
};

const initialStoreState: StoreStateType = {
	stores: [],
	searchText: '',
	setStores,
	setSearchText,
	updateStore,
};

const storeState = makeVar<StoreStateType>(initialStoreState);

export default storeState;
