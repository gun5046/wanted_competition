import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { apiServerAddress } from './variables';
import { createUploadLink } from 'apollo-upload-client';

const cache = new InMemoryCache();

const uploadLink = createUploadLink({ uri: apiServerAddress });

const client = new ApolloClient({
	cache: cache,
	link: from([uploadLink]),
});

export default client;
