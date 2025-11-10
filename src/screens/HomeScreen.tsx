import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { listRecipes } from "../api/recipes";

export const HomeScreen = () => {
	useEffect(() => {
		const load = async () => {
			try {
				const data = await listRecipes(10, 0);
				console.log({ data });
			} catch (err) {
				console.log(err);
			} finally {
			}
		};

		load();
	}, []);

	return (
		<SafeAreaView>
			<Text>HomeScreen</Text>
		</SafeAreaView>
	);
};
