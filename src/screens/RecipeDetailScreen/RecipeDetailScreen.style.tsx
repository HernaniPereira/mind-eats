import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const StyleDetailsScreen = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
	},
	imageContainer: {
		position: "relative",
	},
	image: {
		width,
		height: 280,
	},
	backButton: {
		position: "absolute",
		top: 16,
		left: 16,
		backgroundColor: "rgba(0,0,0,0.5)",
		padding: 8,
		borderRadius: 50,
	},
	content: {
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	categoryText: {
		color: "#7CD932",
		fontWeight: "700",
		fontSize: 12,
		marginBottom: 4,
	},
	title: {
		fontSize: 20,
		fontWeight: "800",
		color: "#000",
		marginBottom: 12,
	},
	tagsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginBottom: 12,
	},
	tag: {
		backgroundColor: "#EEFBE4",
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},
	tagText: {
		fontSize: 12,
		color: "#4C9A12",
		fontWeight: "600",
	},
	description: {
		color: "#444",
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 16,
	},
	statsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 24,
	},
	statCard: {
		alignItems: "center",
		backgroundColor: "#F7F9F4",
		borderRadius: 12,
		padding: 10,
		flex: 1,
		marginHorizontal: 4,
	},
	statValue: {
		fontSize: 14,
		fontWeight: "700",
		color: "#000",
	},
	statLabel: {
		fontSize: 12,
		color: "#777",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		marginVertical: 12,
		color: "#000",
	},
	bulletItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 6,
	},
	bulletDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: "#80E619",
		marginTop: 6,
		marginRight: 8,
	},
	bulletText: {
		flex: 1,
		fontSize: 14,
		color: "#333",
		lineHeight: 20,
	},
	stepItem: {
		flexDirection: "row",
		marginBottom: 8,
	},
	stepNumber: {
		fontWeight: "700",
		color: "#80E619",
		marginRight: 6,
	},
	stepText: {
		flex: 1,
		color: "#333",
		lineHeight: 20,
	},
	favoriteButton: {
		position: "absolute",
		bottom: 20,
		left: 16,
		right: 16,
		backgroundColor: "#80E619",
		borderRadius: 12,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 14,
		gap: 8,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 3,
	},
	favoriteButtonText: {
		color: "#0A0B0A",
		fontWeight: "700",
		fontSize: 16,
	},
});
