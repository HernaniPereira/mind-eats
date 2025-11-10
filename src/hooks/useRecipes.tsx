import { useCallback, useEffect, useState } from "react";
import { getRecipeDetails, listRecipes, searchRecipes } from "../api/recipes";
import type { TRecipe, TRecipeDetailResponse } from "../api/recipes.types";
import { useShallow } from "zustand/shallow";
import { useRecipeStore } from "../store/useRecipeStore";

export const useRecipes = () => {
	const [loading, setLoading] = useState(false);
	const [recipes, setRecipes] = useState<TRecipe[]>([]);
	const [recipeDetail, setRecipeDetail] = useState<TRecipeDetailResponse>();

	const [error, setError] = useState<string | null>(null);

	const { searchTerm } = useRecipeStore(
		useShallow((state) => ({
			searchTerm: state.searchTerm,
		})),
	);

	const { setRecipe } = useRecipeStore.getState();

	useEffect(() => {
		let mount = true;
		const load = async () => {
			try {
				setLoading(true);
				const data = await listRecipes(10, 0);
				if (mount) setRecipes(data.recipes || []);
			} catch (err) {
				setError(String(err));
			} finally {
				mount && setLoading(false);
			}
		};

		load();
		return () => {
			mount = false;
		};
	}, []);

	useEffect(() => {
		if (!searchTerm) return;

		let mount = true;
		const runSearch = async () => {
			try {
				setLoading(true);
				const data = await searchRecipes(searchTerm);
				if (mount) setRecipes(data.recipes || []);
			} catch (err) {
				setError(String(err));
			} finally {
				setLoading(false);
			}
		};

		runSearch();
		return () => {
			mount = false;
		};
	}, [searchTerm]);

	const getDetail = useCallback(async (id: string) => {
		try {
			setLoading(true);
			const data = await getRecipeDetails(Number(id));
			setRecipe(data);
		} finally {
			setLoading(false);
		}
	}, []);

	return { loading, recipes, error, getDetail, recipeDetail };
};
