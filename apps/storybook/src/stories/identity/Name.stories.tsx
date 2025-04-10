import { BY_USER } from "@geist/domain/user.fixture";
import { Name } from "@geist/ui-react/components/identity/name";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { withQueryClientProvider } from "../decorators/wagmi";

const meta = {
	title: "Identity/Name/Name",
	component: Name,
	parameters: {
		layout: "centered",
	},
	args: {},
} satisfies Meta<typeof Name>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to test that the name is displayed correctly
const testNameRendering = async (canvasElement: HTMLElement) => {
	const canvas = within(canvasElement);

	await new Promise((resolve) => setTimeout(resolve, 2000));

	const name = await canvas.findByTestId("name");
	expect(name).toBeInTheDocument();
};

export const Short: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.address,
	},
	decorators: [withQueryClientProvider()],
	play: async ({ canvasElement }) => {
		await testNameRendering(canvasElement);
	},
};
