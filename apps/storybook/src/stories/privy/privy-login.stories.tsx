import { Meta, StoryObj } from "@storybook/react";
import { PrivyLogin, PrivyLoginProvider } from "./privy-login";

function PrivyLoginStories() {
	return (
		<PrivyLoginProvider>
			<PrivyLogin />
		</PrivyLoginProvider>
	);
}

const meta = {
	title: "Privy/Login",
	component: PrivyLoginStories,
} satisfies Meta<typeof PrivyLoginStories>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
