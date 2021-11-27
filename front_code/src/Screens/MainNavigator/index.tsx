import React from 'react';
import { StackNav } from 'Navigations';
import BottomTab from 'Screens/BottomTab';
import { reactiveScreen } from 'Commons/variables';
import Map from 'Screens/Map';
import Detail from 'Screens/Detail';
import Login from 'Screens/Login';
import QRScreen from 'Screens/QRScreen';

const MainNavigator = () => {
	return (
		<StackNav.Navigator initialRouteName="User">
			<>
				<StackNav.Screen
					name="Login"
					options={{ headerShown: false }}
					component={Login}
				/>
				<StackNav.Screen
					name="BottomTab"
					component={BottomTab}
					options={{ headerShown: false }}
				/>
				<StackNav.Screen
					name="Map"
					component={Map}
					options={{ headerShown: false }}
				/>
				<StackNav.Screen
					name="Detail"
					component={Detail}
					options={({ route }: { route: any }) => {
						return {
							headerTitleAlign: 'center',
							headerTitleStyle: {
								fontSize: reactiveScreen * 0.022,
								fontWeight: 'bold',
							},
							title: route?.params?.store.name,
						};
					}}
				/>
				<StackNav.Screen
					name="QRScreen"
					component={QRScreen}
					options={{ headerTitle: 'Back' }}
				/>
			</>
		</StackNav.Navigator>
	);
};

export default MainNavigator;
