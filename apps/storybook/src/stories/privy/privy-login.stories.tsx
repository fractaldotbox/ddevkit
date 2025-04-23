import {
	PrivyLogin,
	PrivyLoginProvider,
	PrivyLogout,
} from "@geist/ui-react/components/privy/privy-login";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { setupCanvas } from "../utils/test-utils";

interface PrivyLoginProps {
	appId: string;
}

function PrivyLoginStories({ appId }: PrivyLoginProps) {
	return (
		<PrivyLoginProvider appId={appId}>
			<PrivyLogin />
			<PrivyLogout />
		</PrivyLoginProvider>
	);
}

const meta = {
	title: "Privy/LoginAndLogout",
	component: PrivyLoginStories,
	argTypes: {
		appId: {
			control: "text",
			name: "Privy App ID",
		},
	},
} satisfies Meta<typeof PrivyLoginStories>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		appId: "cm2vi1gua0aukbq4p69w3rphl",
	},
	play: async ({ canvasElement }) => {
		const { canvas } = await setupCanvas(canvasElement, 1000);

		const loginButton = canvas.getByRole("button", { name: "Login" });
		const logoutButton = canvas.getByRole("button", { name: "Logout" });

		expect(loginButton).toBeInTheDocument();
		expect(logoutButton).toBeInTheDocument();
	},
};
