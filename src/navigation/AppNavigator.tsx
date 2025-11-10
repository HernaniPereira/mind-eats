import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/ProfileScreen";
import { HomeScreen } from "../screens/HomeScreen";
import IconHome from "../../assets/icons/IconHome";
import { IconFavorite } from "../../assets/icons/IconFavorite";
import IconProfile from "../../assets/icons/IconProfile";
import { FavoriteScreen } from "../screens/FavoriteScreen";

export const TabNavigator = () => {
	const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{ header: () => null }}
		>
			<Tab.Screen
				name={"Home"}
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<IconHome color={focused ? "#80E619" : "#DBDFD6"} />
					),
				}}
			/>
			<Tab.Screen
				name={"Favorite"}
				component={FavoriteScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<IconFavorite color={focused ? "#80E619" : "#DBDFD6"} />
					),
				}}
			/>
			<Tab.Screen
				name={"Profile"}
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<IconProfile color={focused ? "#80E619" : "#DBDFD6"} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};
