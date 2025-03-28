import { BY_PROJECT } from "@geist/domain/project.fixture";
import { ProjectMetricsCard } from "@geist/ui-react/components/oso/project-metrics-card";
import type { Meta, StoryObj } from "@storybook/react";
import type { Address } from "viem";
import { withWagmiProvider } from "#stories/decorators/wagmi.tsx";

// TODO for code metrics
const meta = {
	title: "OSO/ProjectMetricsCard",
	component: ProjectMetricsCard,
	parameters: {
		layout: "centered",
	},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof ProjectMetricsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DdevKitProject: Story = {
	args: {
		projectId: BY_PROJECT.DDEV_KIT.osoProjectIdV1,
	},
	parameters: {},
};
