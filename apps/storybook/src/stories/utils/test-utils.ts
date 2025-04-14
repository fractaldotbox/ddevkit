import { within } from "@storybook/test";

export async function setupCanvas(canvasElement: HTMLElement, delayMs = 2000) {
	const canvas = within(canvasElement);

	await new Promise((resolve) => setTimeout(resolve, delayMs));

	return {
		canvas,
	};
}
