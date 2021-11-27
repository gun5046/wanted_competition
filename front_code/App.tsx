/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';

import { Navigation } from 'Navigations';
import MainNavigator from 'Screens/MainNavigator';
// import store from 'Redux/configureStore';
// import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import client from 'Commons/apolloClient';
import { StyleProvider, Root } from 'native-base';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import { LogBox } from 'react-native';

const App = () => {
	LogBox.ignoreAllLogs(true);

	return (
		<Navigation>
			<StyleProvider style={getTheme(commonColor)}>
				<ApolloProvider client={client}>
					<Root>
						<MainNavigator />
					</Root>
				</ApolloProvider>
			</StyleProvider>
		</Navigation>
	);
};

export default App;
