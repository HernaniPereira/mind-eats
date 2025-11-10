import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { HomeScreen } from "../HomeScreen";

// // ✅ Mock navigation ../../src/navigation/types
jest.mock("./../../navigation/types.ts", () => ({
	useAppNavigation: () => ({
		navigate: jest.fn(),
	}),
}));

// // ✅ Mock SearchBar (simplify)
// jest.mock('../src/components/SearchBar', () => ({
//   SearchBar: () => <></>
// }));

// // ✅ Mock useRecipes
jest.mock("./../../hooks/useRecipes.tsx");
import { useRecipes } from "../../hooks/useRecipes";

jest.mock("@react-native-async-storage/async-storage", () => {});

describe("HomeScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the HomeScreen and list", () => {
		(useRecipes as jest.Mock).mockReturnValue({
			loading: false,
			error: null,
			recipes: [],
		});

		render(<HomeScreen />);

		expect(screen.getByTestId("home-screen")).toBeTruthy();
		expect(screen.getByTestId("recipe-list")).toBeTruthy();
	});

	it("shows loading indicator when loading", () => {
		(useRecipes as jest.Mock).mockReturnValue({
			loading: true,
			error: null,
			recipes: [],
		});

		render(<HomeScreen />);
		expect(screen.getByTestId("loading-indicator")).toBeTruthy();
	});

	it("renders empty FlatList when recipes is empty", () => {
		(useRecipes as jest.Mock).mockReturnValue({
			loading: false,
			error: null,
			recipes: [],
		});

		render(<HomeScreen />);
		expect(screen.getByTestId("recipe-list")).toBeTruthy();
	});
});
