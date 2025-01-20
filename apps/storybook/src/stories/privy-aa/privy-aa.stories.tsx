import { PrivyAAFlow } from "@geist/ui-react/components/privy-aa/account-abstraction.js";
import { PrivyAAProvider } from "@geist/ui-react/components/privy-aa/provider.js";

import type { Meta, StoryObj } from "@storybook/react";

interface PrivyAAProps {
	appId: string;
}

function PrivyAAStories({ appId }: PrivyAAProps) {
	return (
		<PrivyAAProvider appId={appId}>
			<PrivyAAFlow />
		</PrivyAAProvider>
	);
}

const meta = {
	title: "Privy/Account Abstraction",
	component: PrivyAAStories,
	argTypes: {
		appId: {
			control: "text",
			name: "Privy App ID",
		},
	},
} satisfies Meta<typeof PrivyAAStories>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		appId: "",
	},
};
