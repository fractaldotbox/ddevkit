import { BY_PROJECT } from "@geist/domain/project.fixture";
import { ProjectMetricsGrid } from "@geist/ui-react/components/oso/project-metrics-grid";
import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "#stories/decorators/wagmi.tsx";

// TODO for code metrics
const meta = {
	title: "OSO/ProjectMetricsGrid",
	component: ProjectMetricsGrid,
	parameters: {
		layout: "centered",
	},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof ProjectMetricsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DdevKitProject: Story = {
	args: {
		projectId: BY_PROJECT.DDEV_KIT.osoProjectIdV1,
	},
	parameters: {},
};
