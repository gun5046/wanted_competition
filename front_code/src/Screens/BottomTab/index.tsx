import React from 'react';
import { BottomTabNav } from 'Navigations';
import { StyleSheet } from 'react-native';
import { Text, Icon } from 'native-base';
import { reactiveHeight, reactiveScreen } from 'Commons/variables';
import { useReactiveVar } from '@apollo/client';
import Home from 'Screens/Home';
import My from 'Screens/My';
import QR from 'Components/QRComp';
import Map from 'Screens/Map';
import storeState from 'store/StoreState';

const BottomTab = () => {
	const { setSearchText } = useReactiveVar(storeState);

	return (
		<BottomTabNav.Navigator
			initialRouteName="Home"
			tabBarOptions={{
				activeTintColor: 'green',
				inactiveTintColor: 'gray',
				showIcon: true,
				tabStyle: {
					height: reactiveHeight * 0.09,
				},
				iconStyle: {
					width: '100%',
					height: '100%',
				},
			}}
			tabBarPosition="bottom"
			backBehavior="initialRoute"
			swipeEnabled={false}
		>
			<BottomTabNav.Screen
				name="Home"
				component={Home}
				options={{
					tabBarLabel: ({ focused }) => {
						return (
							<Text
								style={focused ? styles.focused_text : styles.unfocused_text}
							>
								홈
							</Text>
						);
					},
					tabBarIcon: () => {
						return <Icon name="heart" style={styles.icon} />;
					},
				}}
			/>
			<BottomTabNav.Screen
				name="Map"
				component={Map}
				listeners={() => ({
					blur: () => {
						setSearchText('');
					},
				})}
				options={{
					tabBarLabel: ({ focused }) => {
						return (
							<Text
								style={focused ? styles.focused_text : styles.unfocused_text}
							>
								지도
							</Text>
						);
					},
					tabBarIcon: () => {
						return <Icon name="search" style={styles.icon} />;
					},
				}}
			/>
			<BottomTabNav.Screen
				name="QR"
				component={QR}
				options={{
					tabBarLabel: ({ focused }) => {
						return (
							<Text
								style={focused ? styles.focused_text : styles.unfocused_text}
							>
								QR
							</Text>
						);
					},
					tabBarIcon: () => {
						return <Icon name="notifications-outline" style={styles.icon} />;
					},
				}}
			/>
			<BottomTabNav.Screen
				name="My"
				component={My}
				options={{
					tabBarLabel: ({ focused }) => {
						return (
							<Text
								style={focused ? styles.focused_text : styles.unfocused_text}
							>
								마이
							</Text>
						);
					},
					tabBarIcon: () => {
						return <Icon name="person" style={styles.icon} />;
					},
				}}
			/>
		</BottomTabNav.Navigator>
	);
};

const styles = StyleSheet.create({
	icon: {
		fontSize: reactiveScreen * 0.035,
	},
	unActive_icon: {
		color: 'gray',
		fontSize: reactiveScreen * 0.035,
	},
	focused_text: {
		color: 'green',
		fontSize: reactiveScreen * 0.015,
		marginBottom: reactiveHeight * 0.01,
	},
	unfocused_text: {
		color: 'black',
		fontSize: reactiveScreen * 0.015,
		marginBottom: reactiveHeight * 0.01,
	},
	unActive_text: {
		color: 'gray',
		fontSize: reactiveScreen * 0.015,
		marginBottom: reactiveHeight * 0.01,
	},
});

export default BottomTab;
