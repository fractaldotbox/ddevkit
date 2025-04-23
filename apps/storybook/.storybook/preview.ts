import "../src/index.css";
import type { Preview } from "@storybook/react";
import { withTags } from "../src/stories/decorators/with-tags";
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
	decorators: [withTags()],
	tags: ["autodocs"],
};

export default preview;
