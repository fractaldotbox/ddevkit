import { PrivyAAFlow } from "@geist/ui-react/components/privy-aa/account-abstraction.js";
import { PrivyAAProvider } from "@geist/ui-react/components/privy-aa/provider.js";

import { Meta, StoryObj } from "@storybook/react";

interface PrivyAAProps {
	appId: string;
	pimlicoApiKey: string;
}

function PrivyAAStories({ appId, pimlicoApiKey }: PrivyAAProps) {
	return (
		<PrivyAAProvider appId={appId} pimlicoApiKey={pimlicoApiKey}>
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
		pimlicoApiKey: {
			control: "text",
			name: "Pimlico API Key",
		},
	},
} satisfies Meta<typeof PrivyAAStories>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		appId: "",
		pimlicoApiKey: "",
	},
};
