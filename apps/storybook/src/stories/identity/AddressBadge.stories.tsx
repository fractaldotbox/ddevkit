import { faker } from "@faker-js/faker";
import { AddressBadge } from "@geist/ui-react/components/identity/address-badge";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import type { Hex } from "viem";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "Identity/AddressBadge",
	component: AddressBadge,
	parameters: {
		layout: "centered",
	},
	args: {},
} satisfies Meta<typeof AddressBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Short: Story = {
	args: {
		address: faker.finance.ethereumAddress() as Hex,
	},
	play: async ({ canvasElement }) => {
		const { canvas } = await setupCanvas(canvasElement);

		// Check if the address is displayed
		const addressBadge = await canvas.findByText(
			/^0x[a-fA-F0-9]{4}\.\.\.[a-fA-F0-9]{4}$/,
		);
		expect(addressBadge).toBeInTheDocument();

		// Check if the tooltip trigger is present
		const tooltipTrigger = await canvas.findByTestId("tooltip-trigger");
		expect(tooltipTrigger).toBeInTheDocument();
	},
};

export const Full: Story = {
	args: {
		address: faker.finance.ethereumAddress() as Hex,
		isFull: true,
	},
	play: async ({ canvasElement }) => {
		const { canvas } = await setupCanvas(canvasElement);

		// Check if the address is displayed
		const addressBadge = await canvas.findByText(/^0x[a-fA-F0-9]{40}$/);
		expect(addressBadge).toBeInTheDocument();

		// Check if the tooltip trigger is present
		const tooltipTrigger = await canvas.findByTestId("tooltip-trigger");
		expect(tooltipTrigger).toBeInTheDocument();
	},
};
