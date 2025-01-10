import {
	asCaip19Id,
	groupCrosschainTokens,
} from "@geist/domain/token/cross-chain";
import {
	PRICE_DATA,
	TOKEN_BALANCES_MULTIPLE_STABLECOINS,
} from "@geist/domain/token/token-balance.fixture";
import { TokenBalanceTable } from "@geist/ui-react/components/token/token-balance-table";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Token/TokenBalanceTable",
	component: TokenBalanceTable,
	parameters: {
		layout: "centered",
	},
	args: {},
	decorators: [],
} satisfies Meta<typeof TokenBalanceTable>;

export default meta;

type Story = StoryObj<typeof meta>;

const asPriceValue = (amount, price) => {
	if (isNaN(price) || isNaN(amount)) {
		return 0;
	}
	return price * amount;
};

const asTokenBalanceEntries = (tokenGroup, priceData) => {
	const entries = Object.entries(tokenGroup).map(
		([symbol, { meta, amount, tokenBalances = [] }]) => {
			return {
				symbol,
				amount,
				subEntries: tokenBalances.map(
					({ chainId, address, symbol, amount }) => {
						const tokenId = asCaip19Id(chainId, address);
						const price = priceData.find(
							({ chainId, address }) =>
								asCaip19Id(chainId, address) === tokenId,
						)?.price;

						console.log("price", price, tokenId);
						return {
							chainId,
							symbol,
							amount,
							price,
							// TODO if price not available
							value: asPriceValue(amount, price),
						};
					},
				),
			};
		},
	);

	return entries.flat();
};

export const CrossChain: Story = {
	args: {
		decimals: 18,
		tokenBalances: asTokenBalanceEntries(
			groupCrosschainTokens(TOKEN_BALANCES_MULTIPLE_STABLECOINS),
			PRICE_DATA,
		),
	},
};
