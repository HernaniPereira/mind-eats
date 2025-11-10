import { api } from "./api";
import { TRecipeDetailResponse, TRecipeListResponse } from "./recipes.types";

export const listRecipes = async (
	limit: number = 10,
	skip: number = 0,
): Promise<TRecipeListResponse> => {
	const res = await api.get("/recipes", {
		params: {
			limit,
			skip,
			select: "name,image,mealType",
		},
	});
	return res.data;
};

export const searchRecipes = async (
	query: string,
	limit: number = 10,
	skip: number = 0,
): Promise<TRecipeListResponse> => {
	const res = await api.get("/recipes/search", {
		params: {
			q: query,
			limit,
			skip,
			select: "name,image",
		},
	});
	return res.data;
};

export const getRecipeDetails = async (
	id: number,
): Promise<TRecipeDetailResponse> => {
	const res = await api.get(`/recipes/${id}`);
	return res.data;
};
