import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";
import { useRecipes } from "../../hooks/useRecipes";
import { useAppRoute } from "../../hooks/useRoute";
import { useAppNavigation } from "../../navigation/types";
import { useFavoritesStore } from "../../store/useFavoriteStore";
import { IconLeftArrow } from "../../../assets/icons/IconLeftArrow";
import { IconFavoriteNoFill } from "../../../assets/icons/IconFavoriteNoFill";
import { useRecipeStore } from "../../store/useRecipeStore";
import { StyleDetailsScreen } from "./RecipeDetailScreen.style";
import { IconFavorite } from "../../../assets/icons/IconFavorite";

export const RecipeDetailScreen = () => {
	const route = useAppRoute<"Detail">();
	const { id } = route.params;

	const { recipe: recipeDetail } = useRecipeStore(
		useShallow((state) => ({
			recipe: state.recipe,
		})),
	);

	const { getDetail } = useRecipes();

	useEffect(() => {
		if (id) getDetail(id);
	}, [id]);

	if (!recipeDetail) {
		return (
			<SafeAreaView>
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						paddingTop: 80,
					}}
				>
					<Text>Loading recipe...</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView testID="detail-screen">
			<ScrollView showsVerticalScrollIndicator={false}>
				<Header />
				<View style={StyleDetailsScreen.content}>
					<Text style={StyleDetailsScreen.categoryText}>
						{recipeDetail.cuisine.toUpperCase()}
					</Text>
					<Text style={StyleDetailsScreen.title}>{recipeDetail.name}</Text>

					<Tags />
					<Stats />
					<Ingredients />
					<Instructions />
					<View style={{ height: 100 }} />
				</View>
			</ScrollView>

			<Footer />
		</SafeAreaView>
	);
};

const Header = () => {
	const navigation = useAppNavigation();

	const { recipe: recipeDetail } = useRecipeStore(
		useShallow((state) => ({
			recipe: state.recipe,
		})),
	);

	return (
		<View style={StyleDetailsScreen.imageContainer}>
			<Image
				source={{ uri: recipeDetail?.image }}
				style={StyleDetailsScreen.image}
			/>
			<TouchableOpacity
				style={StyleDetailsScreen.backButton}
				onPress={() => navigation.goBack()}
			>
				<IconLeftArrow />
			</TouchableOpacity>
		</View>
	);
};

const Tags = () => {
	const { recipe: recipeDetail } = useRecipeStore(
		useShallow((state) => ({
			recipe: state.recipe,
		})),
	);

	return (
		<View style={StyleDetailsScreen.tagsContainer}>
			{recipeDetail?.tags?.map((tag: string, id: number) => (
				<View key={id.toString()} style={StyleDetailsScreen.tag}>
					<Text style={StyleDetailsScreen.tagText}>{tag}</Text>
				</View>
			))}
		</View>
	);
};

const Stats = () => {
	const { recipe: recipeDetail } = useRecipeStore(
		useShallow((state) => ({
			recipe: state.recipe,
		})),
	);

	return (
		<View style={StyleDetailsScreen.statsRow}>
			<View style={StyleDetailsScreen.statCard}>
				<Text style={StyleDetailsScreen.statLabel}>Servings</Text>
				<Text style={StyleDetailsScreen.statValue}>
					{recipeDetail?.servings ?? "2"} people
				</Text>
			</View>
			<View style={StyleDetailsScreen.statCard}>
				<Text style={StyleDetailsScreen.statLabel}>Cook time</Text>
				<Text style={StyleDetailsScreen.statValue}>
					{recipeDetail?.cookTimeMinutes ?? "25’ min"}
				</Text>
			</View>
			<View style={StyleDetailsScreen.statCard}>
				<Text style={StyleDetailsScreen.statLabel}>Rating</Text>
			</View>
		</View>
	);
};

const Ingredients = () => {
	const { recipe: recipeDetail } = useRecipeStore(
		useShallow((state) => ({
			recipe: state.recipe,
		})),
	);

	return (
		<>
			<Text style={StyleDetailsScreen.sectionTitle}>Ingredients</Text>
			{recipeDetail?.ingredients.map((item: string, index: number) => (
				<View key={index.toString()} style={StyleDetailsScreen.bulletItem}>
					<View style={StyleDetailsScreen.bulletDot} />
					<Text style={StyleDetailsScreen.bulletText}>{item}</Text>
				</View>
			))}
		</>
	);
};

const Instructions = () => {
	const { recipe: recipeDetail } = useRecipeStore(
		useShallow((state) => ({
			recipe: state.recipe,
		})),
	);

	return (
		<>
			<Text style={StyleDetailsScreen.sectionTitle}>Instructions</Text>
			{recipeDetail?.instructions.map((item: string, index: number) => (
				<View key={index.toString()} style={StyleDetailsScreen.stepItem}>
					<Text style={StyleDetailsScreen.stepNumber}>{index + 1}.</Text>
					<Text style={StyleDetailsScreen.stepText}>{item}</Text>
				</View>
			))}
		</>
	);
};

const Footer = () => {
	const { recipe: recipeDetail } = useRecipeStore(
		useShallow((state) => ({
			recipe: state.recipe,
		})),
	);

	const { add, remove } = useFavoritesStore(
		useShallow((state) => ({
			add: state.add,
			remove: state.remove,
		})),
	);

	if (!recipeDetail) return;

	const isRecipeFavorite = useFavoritesStore((state) =>
		state.isFavourite?.(recipeDetail?.id),
	);
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
		<TouchableOpacity
			style={StyleDetailsScreen.favoriteButton}
			onPress={handleToggleFavorite}
			activeOpacity={0.85}
		>
			{isRecipeFavorite ? (
				<IconFavorite color="#64B313" />
			) : (
				<IconFavoriteNoFill color="#0A0B0A" />
			)}
			<Text style={StyleDetailsScreen.favoriteButtonText}>
				{isRecipeFavorite ? "Added to Favourites" : "Add to Favourites"}
			</Text>
		</TouchableOpacity>
	);
};
