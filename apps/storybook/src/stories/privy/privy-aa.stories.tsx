import { PrivyAAFlow } from "@geist/ui-react/components/privy-aa/account-abstraction.js";

import config from "@geist/domain/config";
import type { Meta, StoryObj } from "@storybook/react";
import { withPrivyAAProvider } from "#stories/decorators/privy-aa.tsx";

const meta = {
	title: "Privy/Account Abstraction",
	component: PrivyAAFlow,
	argTypes: {},
	decorators: [withPrivyAAProvider({ appId: config.privy.appId! })],
} satisfies Meta<typeof PrivyAAFlow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
