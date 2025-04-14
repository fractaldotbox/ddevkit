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

	let rows = canvas.getAllByRole("row");
	expect(rows).toHaveLength(4);

	const usdcRow = rows[1];
	const usdcRowCells = within(usdcRow).getAllByRole("cell");
	expect(usdcRowCells).toHaveLength(6);
	expect(usdcRowCells[0]).toHaveTextContent("USDC");
	expect(usdcRowCells[1]).toHaveTextContent("");
	expect(usdcRowCells[2]).toHaveTextContent("$1.00");
	expect(usdcRowCells[3]).toHaveTextContent("333,333");
	expect(usdcRowCells[4]).toHaveTextContent("$333,333.00");

	const usdcExpandButton = await within(usdcRow).findByTestId("expand-btn");
	expect(usdcExpandButton).toBeInTheDocument();
	await userEvent.click(usdcExpandButton);
	rows = canvas.getAllByRole("row");
	expect(rows).toHaveLength(6);

	const usdcSubRow = rows[2];
	const usdcSubRowCells = within(usdcSubRow).getAllByRole("cell");
	expect(usdcSubRowCells).toHaveLength(6);
	expect(usdcSubRowCells[0]).toHaveTextContent("USDC");
	expect(usdcSubRowCells[1]).toHaveTextContent("1");
	expect(usdcSubRowCells[2]).toHaveTextContent("$1.00");
	expect(usdcSubRowCells[3]).toHaveTextContent("111,111");
	expect(usdcSubRowCells[4]).toHaveTextContent("$111,111.00");

	const usdcSubRow2 = rows[3];
	const usdcSubRow2Cells = within(usdcSubRow2).getAllByRole("cell");
	expect(usdcSubRow2Cells).toHaveLength(6);
	expect(usdcSubRow2Cells[0]).toHaveTextContent("USDC");
	expect(usdcSubRow2Cells[1]).toHaveTextContent("8453");
	expect(usdcSubRow2Cells[2]).toHaveTextContent("$1.00");
	expect(usdcSubRow2Cells[3]).toHaveTextContent("222,222");
	expect(usdcSubRow2Cells[4]).toHaveTextContent("$222,222.00");

	const usdcCollapseBtn = await within(usdcRow).findByTestId("collapse-btn");
	expect(usdcCollapseBtn).toBeInTheDocument();
	await userEvent.click(usdcCollapseBtn);
	rows = canvas.getAllByRole("row");
	expect(rows).toHaveLength(4);
}

export const Multichain: Story = {
	args: {
		$tokenBalances,
		$priceData,
		locale: "en-US",
	},
	play: async ({ canvasElement }) => {
		await testTokenBalanceTable(canvasElement);
	},
};
