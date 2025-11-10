import { by, device, element, expect } from "detox";

describe("Example", () => {
	beforeAll(async () => {
		await device.launchApp();
		if (device.getPlatform() === "ios") {
			await device.openURL({
				url: `exp+rn-test://expo-development-client/?url=${encodeURIComponent(`http://localhost:8081`)}`,
			});
		}

		await device.shake();
	});

	it("it should show the search bar and list", async () => {
		await device.shake();
		await expect(element(by.id("home-screen"))).toBeVisible();
		await expect(element(by.id("search-bar-search-input"))).toBeVisible();
	});

	it("should show recipe list", async () => {
		await waitFor(element(by.id("recipe-list")))
			.toBeVisible()
			.withTimeout(5000);
	});

	it("should allow typing text into search bar", async () => {
		const input = element(by.id("search-bar-search-input"));

		await expect(input).toBeVisible();

		await input.tap();
		await input.typeText("Pasta");

		await expect(input).toHaveText("Pasta");
	});

	it("should navigate to detail when clicking the first recipe", async () => {
		const item = element(by.id("recipe-item")).atIndex(0);
		await waitFor(item).toBeVisible();

		await item.multiTap(2);
		await expect(element(by.id("detail-screen"))).toBeVisible();
	});
});
