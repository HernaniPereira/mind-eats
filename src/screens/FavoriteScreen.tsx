import React from "react";
import {
	Button,
	FlatList,
	Text,
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";
import { useFavoritesStore, Recipe } from "../store/useFavoriteStore";
import { IconFavorite } from "../../assets/icons/IconFavorite";

export const FavoriteScreen = () => {
	const { favorites } = useFavoritesStore(
		useShallow((state) => ({
			favorites: state.favorites,
		})),
	);
	const { remove } = useFavoritesStore.getState();

	const CardItem = ({ item }: { item: Recipe }) => (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				padding: 8,
			}}
		>
			<Image
				style={{ width: 80, height: 72, borderRadius: 20 }}
				source={{ uri: item.image ?? item.thumbnail }}
			/>

			<View style={{ marginStart: 12, flex: 1 }}>
				<Text style={styles.categoryItem}>{item.category}</Text>
				<Text style={styles.titleItem}>{item.title}</Text>
			</View>
			<TouchableOpacity
				style={{
					width: 48,
					height: 48,
					backgroundColor: "#D1F6AC",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: 20,
				}}
				onPress={() => remove?.(item.id)}
			>
				<IconFavorite color="#64B313" />
			</TouchableOpacity>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.titleText}>My Favorites</Text>
			<FlatList
				data={favorites}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <CardItem item={item} />}
				ListEmptyComponent={() => (
					<View style={{ padding: 20 }}>
						<Text>No favorites yet</Text>
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 16,
	},
	titleText: {
		fontSize: 28,
		fontWeight: "700",

		marginTop: 8,
	},
	titleItem: {
		fontSize: 16,
		fontWeight: "700",
		color: "#000",
	},
	categoryItem: {
		fontSize: 14,
		fontWeight: "700",
		color: "#64B313",
	},
});
