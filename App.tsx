import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecipeDetailScreen } from "./src/screens/RecipeDetailScreen/RecipeDetailScreen";

export type RootStackParamList = {
	Tabs: undefined;
	Detail: { id: string };
};

export type TabsParamList = {
	Home: undefined;
	Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Tabs"
						component={TabNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Detail"
						component={RecipeDetailScreen}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
