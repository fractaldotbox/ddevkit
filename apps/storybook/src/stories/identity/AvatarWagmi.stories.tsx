import type { Meta, StoryObj } from "@storybook/react";

import { withWagmiProvider } from "../decorators/wagmi";
import { BY_USER } from "../fixture";
import { AvatarWagmi } from "./AvatarWagmi";

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
