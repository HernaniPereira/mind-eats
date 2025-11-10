import { create } from "zustand";
import type { TRecipeDetailResponse } from "../api/recipes.types";

type RecipeState = {
	searchTerm: string;
	recipe?: TRecipeDetailResponse;
};

type Mutations = {
	setSearchTerm: (term: string) => void;
	setRecipe: (recipe?: TRecipeDetailResponse) => void;
};

const initialState: RecipeState = {
	searchTerm: "",
};

export const useRecipeStore = create<RecipeState & Mutations>((set) => ({
	...initialState,
	setSearchTerm: (term: string) => set({ searchTerm: term }),
	setRecipe: (recipe?: TRecipeDetailResponse) => set({ recipe: recipe }),
}));
