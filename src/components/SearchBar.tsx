import { memo, useCallback, useState } from "react";
import { View, TextInput } from "react-native";
import { IconSearch } from "../../assets/icons/IconSearch";
import { useRecipeStore } from "../store/useRecipeStore";

export const SearchBar = memo(({ dataTestId }: { dataTestId: string }) => {
	const [searchText, setSearchText] = useState("");
	const { setSearchTerm } = useRecipeStore.getState();

	const onChangeText = useCallback((text: string) => {
		setSearchText(text);

		setTimeout(() => {
			setSearchTerm(text);
		}, 500);
	}, []);

	return (
		<View
			testID={dataTestId}
			style={{
				marginTop: 24,
				backgroundColor: "#fff",
				borderRadius: 20,
				paddingStart: 8,
				height: 50,
				justifyContent: "center",
			}}
		>
			<View
				style={{ flexDirection: "row", alignItems: "center", marginStart: 8 }}
			>
				<IconSearch />
				<TextInput
					testID={`${dataTestId}-search-input`}
					value={searchText}
					onChangeText={onChangeText}
					placeholder="Search for Recipes"
					style={{ backgroundColor: "#fff", marginStart: 16 }}
				/>
			</View>
		</View>
	);
});
