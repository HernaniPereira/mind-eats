import { FavoriteScreen } from "../screens/FavoriteScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/ProfileScreen";
import { HomeScreen } from "../screens/HomeScreen";

export const TabNavigator = () => {
	const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{ header: () => null }}
		>
			<Tab.Screen name={"Home"} component={HomeScreen} />
			<Tab.Screen name={"Favorite"} component={FavoriteScreen} />
			<Tab.Screen name={"Profile"} component={ProfileScreen} />
		</Tab.Navigator>
	);
};
