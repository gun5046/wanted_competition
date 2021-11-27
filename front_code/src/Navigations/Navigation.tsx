import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const Navigation: React.FC = ({ children }) => {
	return <NavigationContainer>{children}</NavigationContainer>;
};

export default Navigation;
