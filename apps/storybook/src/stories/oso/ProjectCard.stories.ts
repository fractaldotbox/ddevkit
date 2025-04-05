import { BY_PROJECT } from "@geist/domain/project.fixture";
import { ProjectCard } from "@geist/ui-react/components/oso/project-card";
import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "#stories/decorators/wagmi.tsx";

const meta = {
	title: "OSO/ProjectCard",
	component: ProjectCard,
	parameters: {
		layout: "centered",
	},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DdevKitProject: Story = {
	args: {
		projectIdV0: BY_PROJECT.DDEV_KIT.osoProjectIdV0,
		projectIdV1: BY_PROJECT.DDEV_KIT.osoProjectIdV1,
	},
	parameters: {},
};
