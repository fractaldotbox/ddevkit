import { createTokenBalanceStoreWithFixture } from "@geist/domain/token/token-balance.fixture";
import { TokenBalanceTable$ } from "@geist/ui-react/components/token/token-balance-table";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "Token/TokenBalanceTable",
	component: TokenBalanceTable$,
	parameters: {
		layout: "centered",
	},
	args: {},
	decorators: [],
} satisfies Meta<typeof TokenBalanceTable$>;

export default meta;

type Story = StoryObj<typeof meta>;

const { $tokenBalances, $priceData } = createTokenBalanceStoreWithFixture();

async function testTokenBalanceTable(canvasElement: HTMLElement) {
	const { canvas } = await setupCanvas(canvasElement, 2000);

	const allHeaders = await canvas.getAllByRole("columnheader");
	expect(allHeaders).toHaveLength(6);
	expect(allHeaders[0]).toHaveTextContent("Symbol");
	expect(allHeaders[1]).toHaveTextContent("ChainId");
	expect(allHeaders[2]).toHaveTextContent("Price");
	expect(allHeaders[3]).toHaveTextContent("Amount");
	expect(allHeaders[4]).toHaveTextContent("Value");

	const rows = canvas.getAllByRole("row");
	expect(rows).toHaveLength(4);

	const usdcRow = rows[1];
	expect(usdcRow).toHaveTextContent("USDC");
	expect(usdcRow).toHaveTextContent("$1.00");
	expect(usdcRow).toHaveTextContent("333,333");
	expect(usdcRow).toHaveTextContent("$333,333.00");

	const usdcExpandButton = await within(usdcRow).findByRole("svg");
	expect(usdcExpandButton).toBeInTheDocument();
	await userEvent.click(usdcExpandButton);
	await waitFor(() => {
		expect(rows).toHaveLength(5);
	});

	// const usdtRow = rows[2];
	// expect(usdtRow).toHaveTextContent("USDT");
	// expect(usdtRow).toHaveTextContent("$1.00");
	// expect(usdtRow).toHaveTextContent("777,777");
	// expect(usdtRow).toHaveTextContent("$777,777.00");

	// const opRow = rows[3];
	// expect(opRow).toHaveTextContent("OP");
	// expect(opRow).toHaveTextContent("$2.10");
	// expect(opRow).toHaveTextContent("555,555");
	// expect(opRow).toHaveTextContent("$1,166,665.50");
}

export const Multichain: Story = {
	args: {
		$tokenBalances,
		$priceData,
	},
	play: async ({ canvasElement }) => {
		await testTokenBalanceTable(canvasElement);
	},
};
