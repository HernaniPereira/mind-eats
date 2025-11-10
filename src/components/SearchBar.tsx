import { memo, useCallback, useState } from "react";
import { View, TextInput } from "react-native";
import { useSearchStore } from "../store/useSearchStore";
import { IconSearch } from "../../assets/icons/IconSearch";

export const SearchBar = memo(() => {
	const [searchText, setSearchText] = useState("");
	const { setSearchTerm } = useSearchStore.getState();

	const onChangeText = useCallback((text: string) => {
		setSearchText(text);

		setTimeout(() => {
			setSearchTerm(text);
		}, 500);
	}, []);

	return (
		<View
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
					value={searchText}
					onChangeText={onChangeText}
					placeholder="Search for Recipes"
					style={{ backgroundColor: "#fff", marginStart: 16 }}
				/>
			</View>
		</View>
	);
});
