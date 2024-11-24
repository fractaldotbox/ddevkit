import type { Meta, StoryObj } from "@storybook/react";
import { Address } from "viem";
import { BY_USER } from "../fixture";
import { UCANForm } from "./UCANForm";

const meta = {
	title: "ucan/UCANForm",
	component: UCANForm,
	parameters: {
		layout: "centered",
	},
	argTypes: {},
	args: {},
	decorators: [],
} satisfies Meta<typeof UCANForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UCAN: Story = {
	args: {
		privateKey: BY_USER.mock.privateKey,
	},
};
