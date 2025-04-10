import { BY_USER } from "@geist/domain/user.fixture";
import { NameWagmi } from "@geist/ui-react/components/identity/name-wagmi";
import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";

const meta = {
	title: "Identity/Name/NameWagmi",
	component: NameWagmi,
	parameters: {
		layout: "centered",
	},
	args: {},
} satisfies Meta<typeof NameWagmi>;

export default meta;
import { expect } from "@storybook/test";
import { setupCanvas } from "../utils/test-utils";

type Story = StoryObj<typeof meta>;

// Helper function to test that the name is displayed correctly
const testNameRendering = async (canvasElement: HTMLElement) => {
	const { canvas } = await setupCanvas(canvasElement);

	const name = await canvas.findByTestId("name");
	expect(name).toBeInTheDocument();
};

export const Short: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.address,
	},
	decorators: [withWagmiProvider()],
	play: async ({ canvasElement }) => {
		await testNameRendering(canvasElement);
	},
};
