import type { Meta, StoryObj } from "@storybook/react";

import { BY_USER } from "@repo/domain/user.fixture";
import { AvatarWagmi } from "@repo/ui-react/components/identity/avatar-wagmi";
import { withWagmiProvider } from "../decorators/wagmi";

const meta = {
	title: "Identity/Avatar/AvatarWagmi",
	component: AvatarWagmi,
	args: {},
} satisfies Meta<typeof AvatarWagmi>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EnsWagmi: Story = {
	args: {
		ens: BY_USER.vitalik.ens,
	},
	decorators: [withWagmiProvider()],
};
