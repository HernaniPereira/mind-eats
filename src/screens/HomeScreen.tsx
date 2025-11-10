import React, { memo, useCallback, useEffect } from "react";
import {
	ActivityIndicator,
	FlatList,
	Text,
	TouchableOpacity,
	View,
	Image,
	StyleSheet,
	Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TRecipe } from "../api/recipes.types";
import { useRecipes } from "../components/useRecipes";
import { useAppNavigation } from "../navigation/types";
import { SearchBar } from "../components/SearchBar";
import { IconFavorite } from "../../assets/icons/IconFavorite";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 2;

const RecipeCardItem = memo(
	({ item, onPress }: { item: TRecipe; onPress: () => void }) => (
		<TouchableOpacity
			onPress={onPress}
			style={styles.cardContainer}
			activeOpacity={0.8}
		>
			<View style={{ position: "relative" }}>
				<Image source={{ uri: item.image }} style={styles.cardImage} />

				<TouchableOpacity style={styles.favoriteButton} activeOpacity={0.8}>
					<IconFavorite size={22} />
				</TouchableOpacity>
			</View>
			<View style={styles.cardTextContainer}>
				{item.mealType?.length >= 1 && (
					<Text style={styles.categoryText}>
						{item.mealType[0].toUpperCase()}
					</Text>
				)}
				<Text style={styles.recipeName} numberOfLines={2}>
					{item.name}
				</Text>
			</View>
		</TouchableOpacity>
	),
);

export const HomeScreen = () => {
	const { loading, recipes, error } = useRecipes();
	const navigation = useAppNavigation();

	const handleSelect = useCallback(
		(id: string) => {
			navigation.navigate("Detail", { id });
		},
		[navigation],
	);

	const renderItem = useCallback(
		({ item }: { item: TRecipe }) => (
			<RecipeCardItem item={item} onPress={() => handleSelect(item.id)} />
		),
		[handleSelect],
	);
	return (
		<SafeAreaView style={{ marginHorizontal: 16 }}>
			<Text style={styles.logoText}>
				Mind<Text style={{ color: "#95E64C" }}>Eats</Text>
			</Text>
			<SearchBar />
			<Text style={styles.sectionTitle}>Popular</Text>

			{loading && (
				<ActivityIndicator
					testID="loading-indicator"
					style={{ marginTop: 40 }}
				/>
			)}
			{error && (
				<Text testID="error-text" style={{ color: "red" }}>
					{error}
				</Text>
			)}
			<FlatList
				testID="recipe-list"
				data={recipes}
				keyExtractor={(item) => String(item.id)}
				renderItem={renderItem}
				numColumns={2}
				contentContainerStyle={styles.listContent}
				ListEmptyComponent={() => (
					<View style={{ padding: 20 }}>
						<Text style={{ textAlign: "center", color: "#666" }}>
							There are no results
						</Text>
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F6F8F2",
		paddingHorizontal: 16,
	},
	logoText: {
		fontSize: 28,
		fontWeight: "700",
		textAlign: "center",
		color: "#B2E84B",
		marginTop: 8,
	},
	searchBar: {
		marginTop: 12,
		marginBottom: 8,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#000",
		marginVertical: 8,
	},
	listContent: {
		paddingBottom: 150,
	},
	favoriteButton: {
		position: "absolute",
		top: 10,
		right: 10,
		backgroundColor: "rgba(0,0,0,0.35)",
		borderRadius: 20,
		padding: 5,
	},
	cardContainer: {
		width: CARD_WIDTH,
		backgroundColor: "#fff",
		borderRadius: 12,
		margin: 8,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
	},
	cardImage: {
		width: "100%",
		height: 120,
	},
	cardTextContainer: {
		padding: 8,
	},
	categoryText: {
		fontSize: 12,
		color: "#A8B88C",
		fontWeight: "600",
		marginBottom: 4,
	},
	recipeName: {
		fontSize: 14,
		fontWeight: "700",
		color: "#000",
	},
});
