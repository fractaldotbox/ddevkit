import "../src/index.css";
import type { Preview } from "@storybook/react";

// storybook Manager will serialize args
// @ts-ignore
BigInt.prototype.toJSON = function () {
	return this.toString();
};

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	tags: ["autodocs"],
};

export default preview;
