import { BY_USER } from "@geist/domain/user.fixture";
import { PassportScoreCard } from "@geist/ui-react/components/passport/score-card";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import type { Address } from "viem";
import { withWagmiProvider } from "#stories/decorators/wagmi.tsx";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "Passport/PassportScoreCard",
	component: PassportScoreCard,
	parameters: {
		layout: "centered",
	},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof PassportScoreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

async function testPassportScoreCardDisplay(
	canvasElement: HTMLElement,
	addressText: string,
) {
	const { canvas } = await setupCanvas(canvasElement, 3000);

	const svgElement = canvasElement.querySelector("svg");
	expect(svgElement).toBeInTheDocument();

	const addressElement = canvas.getByText(addressText);
	expect(addressElement).toBeInTheDocument();

	await new Promise((resolve) => setTimeout(resolve, 2000));
	const scoreRegex = /\d+\.\d{2}/;
	const scoreElements = canvas.getByTestId("passport-score-card-score");
	expect(scoreElements.textContent).toMatch(scoreRegex);
}

export const VitalikModel: Story = {
	args: {
		address: BY_USER.vitalik.address,
		passportParams: {
			model: "aggregate",
		},
	},
	parameters: {},
	play: async ({ canvasElement }) => {
		await testPassportScoreCardDisplay(canvasElement, "0xd8dA...6045");
	},
};

export const UserModel: Story = {
	args: {
		address: BY_USER.jesse.address as Address,
		passportParams: {
			model: "aggregate",
		},
	},
	play: async ({ canvasElement }) => {
		await testPassportScoreCardDisplay(canvasElement, "0x8491...8bf1");
	},
};

// need the address to verify stamps look for official examples
export const UserScorer: Story = {
	args: {
		address: BY_USER.vitalik.address,
		passportParams: {
			scorerId: 11454,
		},
	},
	play: async ({ canvasElement }) => {
		await testPassportScoreCardDisplay(canvasElement, "0xd8dA...6045");
	},
};
