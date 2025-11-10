import { useEffect, useState } from "react";
import { listRecipes, searchRecipes } from "../api/recipes";
import { TRecipe } from "../api/recipes.types";
import { useShallow } from "zustand/shallow";
import { useSearchStore } from "../store/useSearchStore";

export const useRecipes = () => {
	const [loading, setLoading] = useState(false);
	const [recipes, setRecipes] = useState<TRecipe[]>([]);

	const [error, setError] = useState<string | null>(null);

	const { searchTerm } = useSearchStore(
		useShallow((state) => ({
			searchTerm: state.searchTerm,
		})),
	);

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

	return { loading, recipes, error };
};
