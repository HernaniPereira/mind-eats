export type TRecipe = {
	id: string;
	name: string;
	image: string;
	cuisine: string;
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
	tags: string[];
	servings: number;
	mealType: string[];
	cookTimeMinutes: number;
};
