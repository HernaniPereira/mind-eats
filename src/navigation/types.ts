import { RootStackParamList } from "@/App";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export function useAppNavigation() {
	return useNavigation<NavigationProp<RootStackParamList>>();
}
