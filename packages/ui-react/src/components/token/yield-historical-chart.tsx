import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
	ChartContainer,
	type ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart.js";

type YieldHistoricalChartProps = {
	// this will be defillama pool id
	poolId: string;
};

export type DefiLlamaYieldDataPoint = {
	timestamp: string;
	tvlUsd: number;
	apy: number;
	apyBase: number;
	apyReward: number | null;
	il7d: number | null;
	apyBase7d: number | null;
};

// Mock historical yield data following DefiLlamaYieldDataPoint type
const MOCK_YIELD_DATA: DefiLlamaYieldDataPoint[] = [
	{
		timestamp: "2024-03-01",
		tvlUsd: 1000000,
		apy: 3.5,
		apyBase: 3.2,
		apyReward: 0.3,
		il7d: -0.1,
		apyBase7d: 3.3,
	},
	{
		timestamp: "2024-03-02",
		tvlUsd: 1100000,
		apy: 3.8,
		apyBase: 3.5,
		apyReward: 0.3,
		il7d: -0.12,
		apyBase7d: 3.6,
	},
	{
		timestamp: "2024-03-03",
		tvlUsd: 1150000,
		apy: 4.1,
		apyBase: 3.7,
		apyReward: 0.4,
		il7d: -0.08,
		apyBase7d: 3.8,
	},
	{
		timestamp: "2024-03-04",
		tvlUsd: 1200000,
		apy: 4.3,
		apyBase: 3.8,
		apyReward: 0.5,
		il7d: -0.05,
		apyBase7d: 3.9,
	},
	{
		timestamp: "2024-03-05",
		tvlUsd: 1180000,
		apy: 4.0,
		apyBase: 3.6,
		apyReward: 0.4,
		il7d: -0.07,
		apyBase7d: 3.7,
	},
	{
		timestamp: "2024-03-06",
		tvlUsd: 1250000,
		apy: 4.5,
		apyBase: 4.0,
		apyReward: 0.5,
		il7d: -0.04,
		apyBase7d: 4.1,
	},
	{
		timestamp: "2024-03-07",
		tvlUsd: 1300000,
		apy: 4.7,
		apyBase: 4.1,
		apyReward: 0.6,
		il7d: -0.03,
		apyBase7d: 4.2,
	},
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#2563eb",
	},
	mobile: {
		label: "Mobile",
		color: "#60a5fa",
	},
} satisfies ChartConfig;

export function YieldHistoricalChart({ poolId }: YieldHistoricalChartProps) {
	return <>Chart Test</>;
}
