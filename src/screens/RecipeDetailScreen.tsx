import React, { useEffect } from "react";
import {
	Dimensions,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Image,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";
import { useRecipes } from "../hooks/useRecipes";
import { useAppRoute } from "../hooks/useRoute";
import { useAppNavigation } from "../navigation/types";
import { useFavoritesStore } from "../store/useFavoriteStore";
import { FavoriteScreen } from "./FavoriteScreen";
import { IconLeftArrow } from "../../assets/icons/IconLeftArrow";
import { IconFavoriteNoFill } from "../../assets/icons/IconFavoriteNoFill";

const { width } = Dimensions.get("window");

export const RecipeDetailScreen = () => {
	const route = useAppRoute<"Detail">();
	const { id } = route.params;
	const navigation = useAppNavigation();

	const { add, remove, isFavourite } = useFavoritesStore(
		useShallow((state) => ({
			add: state.add,
			remove: state.remove,
			isFavourite: state.isFavourite,
		})),
	);

	const { getDetail, recipeDetail } = useRecipes();

	useEffect(() => {
		if (id) getDetail(id);
	}, [id]);

	if (!recipeDetail) return null;

	const isRecipeFavorite = isFavourite?.(recipeDetail.id) ?? false;

	const handleToggleFavorite = () => {
		if (isRecipeFavorite) {
			remove?.(recipeDetail.id);
		} else {
			add?.({
				id: recipeDetail.id,
				title: recipeDetail.name,
				image: recipeDetail.image,
				category: recipeDetail.cuisine,
			});
		}
	};

	return (
		<SafeAreaView testID="detail-screen">
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* --- Header Image + Back Button --- */}
				<View style={styles.imageContainer}>
					<Image source={{ uri: recipeDetail.image }} style={styles.image} />
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => navigation.goBack()}
					>
						<IconLeftArrow />
					</TouchableOpacity>
				</View>

				{/* --- Content --- */}
				<View style={styles.content}>
					<Text style={styles.categoryText}>
						{recipeDetail.cuisine.toUpperCase()}
					</Text>
					<Text style={styles.title}>{recipeDetail.name}</Text>

					{/* --- Tags --- */}
					<View style={styles.tagsContainer}>
						{recipeDetail.tags?.map((tag: string, id: number) => (
							<View key={id.toString()} style={styles.tag}>
								<Text style={styles.tagText}>{tag}</Text>
							</View>
						))}
					</View>

					{/* --- Description --- */}
					{/* {recipeDetail.description && (
						<Text style={styles.description}>{recipeDetail.description}</Text>
					)} */}

					{/* --- Stats --- */}
					<View style={styles.statsRow}>
						<View style={styles.statCard}>
							<Text style={styles.statLabel}>Servings</Text>
							<Text style={styles.statValue}>
								{recipeDetail.servings ?? "2"} people
							</Text>
						</View>
						<View style={styles.statCard}>
							<Text style={styles.statLabel}>Cook time</Text>
							<Text style={styles.statValue}>
								{recipeDetail.cookTimeMinutes ?? "25’ min"}
							</Text>
						</View>
						<View style={styles.statCard}>
							{/* <Text style={styles.statValue}>
								⭐ {recipeDetail.rating ?? "4.0"}
							</Text> */}
							<Text style={styles.statLabel}>Rating</Text>
						</View>
					</View>

					{/* --- Ingredients --- */}
					<Text style={styles.sectionTitle}>Ingredients</Text>
					{recipeDetail.ingredients.map((item: string, index: number) => (
						<View key={index.toString()} style={styles.bulletItem}>
							<View style={styles.bulletDot} />
							<Text style={styles.bulletText}>{item}</Text>
						</View>
					))}

					{/* --- Instructions --- */}
					<Text style={styles.sectionTitle}>Instructions</Text>
					{recipeDetail.instructions.map((item: string, index: number) => (
						<View key={index.toString()} style={styles.stepItem}>
							<Text style={styles.stepNumber}>{index + 1}.</Text>
							<Text style={styles.stepText}>{item}</Text>
						</View>
					))}

					<View style={{ height: 100 }} />
				</View>
			</ScrollView>

			{/* --- Bottom Button --- */}
			<TouchableOpacity
				style={styles.favoriteButton}
				onPress={handleToggleFavorite}
				activeOpacity={0.85}
			>
				<IconFavoriteNoFill color="#0A0B0A" />
				<Text style={styles.favoriteButtonText}>
					{isRecipeFavorite ? "Added to Favourites" : "Add to Favourites"}
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

// const Header = () => {

// 	const navigation = useAppNavigation();

// 	return (<View style={styles.imageContainer}>
// 					<Image source={{ uri: recipeDetail.image }} style={styles.image} />
// 					<TouchableOpacity
// 						style={styles.backButton}
// 						onPress={() => navigation.goBack()}
// 					>
// 						<IconLeftArrow />
// 					</TouchableOpacity>
// 				</View>)
// }

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
	},
	imageContainer: {
		position: "relative",
	},
	image: {
		width,
		height: 280,
	},
	backButton: {
		position: "absolute",
		top: 16,
		left: 16,
		backgroundColor: "rgba(0,0,0,0.5)",
		padding: 8,
		borderRadius: 50,
	},
	content: {
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	categoryText: {
		color: "#7CD932",
		fontWeight: "700",
		fontSize: 12,
		marginBottom: 4,
	},
	title: {
		fontSize: 20,
		fontWeight: "800",
		color: "#000",
		marginBottom: 12,
	},
	tagsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginBottom: 12,
	},
	tag: {
		backgroundColor: "#EEFBE4",
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},
	tagText: {
		fontSize: 12,
		color: "#4C9A12",
		fontWeight: "600",
	},
	description: {
		color: "#444",
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 16,
	},
	statsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 24,
	},
	statCard: {
		alignItems: "center",
		backgroundColor: "#F7F9F4",
		borderRadius: 12,
		padding: 10,
		flex: 1,
		marginHorizontal: 4,
	},
	statValue: {
		fontSize: 14,
		fontWeight: "700",
		color: "#000",
	},
	statLabel: {
		fontSize: 12,
		color: "#777",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		marginVertical: 12,
		color: "#000",
	},
	bulletItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 6,
	},
	bulletDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: "#80E619",
		marginTop: 6,
		marginRight: 8,
	},
	bulletText: {
		flex: 1,
		fontSize: 14,
		color: "#333",
		lineHeight: 20,
	},
	stepItem: {
		flexDirection: "row",
		marginBottom: 8,
	},
	stepNumber: {
		fontWeight: "700",
		color: "#80E619",
		marginRight: 6,
	},
	stepText: {
		flex: 1,
		color: "#333",
		lineHeight: 20,
	},
	favoriteButton: {
		position: "absolute",
		bottom: 20,
		left: 16,
		right: 16,
		backgroundColor: "#80E619",
		borderRadius: 12,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 14,
		gap: 8,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 3,
	},
	favoriteButtonText: {
		color: "#0A0B0A",
		fontWeight: "700",
		fontSize: 16,
	},
});
