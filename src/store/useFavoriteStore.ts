import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Recipe = {
	id: string;
	title: string;
	thumbnail?: string;
	image?: string;
	category?: string;
	ingredients?: string[];
	instructions?: string;
};

type Mutations = {
	add?: (recipe: Recipe) => void;
	remove?: (id: string) => void;
	isFavourite?: (id: string) => boolean;
	list?: () => Recipe[];
};
type FavoritesState = {
	favorites: Recipe[];
};

const initialState: FavoritesState = {
	favorites: [],
};

export const useFavoritesStore = create<FavoritesState & Mutations>()(
	persist(
		(set, get) => ({
			...initialState,
			add: (recipe: Recipe) =>
				set((state) => ({
					favorites: [...state.favorites, recipe],
				})),

			remove: (id: string) =>
				set((state) => ({
					favorites: state.favorites.filter((item) => item.id !== id),
				})),

			isFavourite: (id: string) => {
				return get().favorites.some((item) => item.id === id);
			},

			list: () => get().favorites,
		}),

		{
			name: "recipes_store",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
