import { within } from "@storybook/test";

/**
 * Utility function to setup a canvas for testing in Storybook play functions.
 * This abstracts the common pattern of getting a canvas element and adding a delay.
 *
 * @param canvasElement - The HTML element representing the canvas
 * @param delayMs - Optional delay in milliseconds (defaults to 2000ms)
 * @returns An object containing the canvas and other utilities
 */
export async function setupCanvas(canvasElement: HTMLElement, delayMs = 2000) {
	// Get the canvas using within
	const canvas = within(canvasElement);

	// Add a delay to allow components to load/render
	await new Promise((resolve) => setTimeout(resolve, delayMs));

	return {
		canvas,
		// Additional utilities can be added here if needed
	};
}
