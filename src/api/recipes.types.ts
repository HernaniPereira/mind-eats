export type TRecipe = {
	id: string;
	name: string;
	image: string;
};

export type TRecipeListResponse = {
	recipes: TRecipe[];
	total: number;
	skip: number;
	limit: number;
};

export type TRecipeDetailResponse = {
	id: string;
	name: string;
	cuisine: string;
	image: string;
	instructions: string[];
	ingredients: string[];
};
