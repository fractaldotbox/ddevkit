import { BY_PROJECT } from "@geist/domain/project.fixture";
import { ProjectMetricsGrid } from "@geist/ui-react/components/oso/project-metrics-grid";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { within } from "@testing-library/react";
import { withWagmiProvider } from "#stories/decorators/wagmi.tsx";

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
	play: async ({ canvasElement }) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const cards = Array.from(
			canvasElement.querySelectorAll(".rounded-lg.border.bg-card"),
		);
		expect(cards.length).toBe(4);

		const activeDeveloperCard = cards[0] as HTMLElement;
		const activeDeveloperTitle = within(activeDeveloperCard).getByText(
			/Active Developer Count/i,
		);
		expect(activeDeveloperTitle).toBeInTheDocument();

		const activeDeveloperValue =
			activeDeveloperCard.querySelector(".tabular-nums");
		expect(activeDeveloperValue).not.toBeNull();
		if (activeDeveloperValue) {
			expect(activeDeveloperValue.textContent).toMatch(/^\d+$/); // Should be a number
		}

		const activeDeveloperPeriod =
			within(activeDeveloperCard).getByText(/Last 6 Months/i);
		expect(activeDeveloperPeriod).toBeInTheDocument();

		const commitCountCard = cards[1] as HTMLElement;
		const commitCountTitle = within(commitCountCard).getByText(/Commit Count/i);
		expect(commitCountTitle).toBeInTheDocument();

		const commitCountValue = commitCountCard.querySelector(".tabular-nums");
		expect(commitCountValue).not.toBeNull();
		if (commitCountValue) {
			expect(commitCountValue.textContent).toMatch(/^\d+$/); // Should be a number
		}

		const commitCountPeriod =
			within(commitCountCard).getByText(/Last 6 Months/i);
		expect(commitCountPeriod).toBeInTheDocument();

		const developerCountCard = cards[2] as HTMLElement;
		const developerCountTitle =
			within(developerCountCard).getByText(/Developer Count/i);
		expect(developerCountTitle).toBeInTheDocument();

		const developerCountValue =
			developerCountCard.querySelector(".tabular-nums");
		expect(developerCountValue).not.toBeNull();
		if (developerCountValue) {
			expect(developerCountValue.textContent).toMatch(/^\d+$/); // Should be a number
		}

		const developerCountPeriod =
			within(developerCountCard).getByText(/All period/i);
		expect(developerCountPeriod).toBeInTheDocument();

		const lastCommitCard = cards[3] as HTMLElement;
		const lastCommitTitle =
			within(lastCommitCard).getByText(/Last Commit Date/i);
		expect(lastCommitTitle).toBeInTheDocument();

		const lastCommitValue = lastCommitCard.querySelector(".tabular-nums");
		expect(lastCommitValue).not.toBeNull();
		if (lastCommitValue) {
			expect(lastCommitValue.textContent).toMatch(
				/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
			);
		}
	},
};
