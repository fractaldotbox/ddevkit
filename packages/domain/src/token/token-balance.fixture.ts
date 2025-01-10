// TODO cross-check blockscout

// TODO decimal based
// TODO confirm price modelfor cross-chain assets
export const PRICE_DATA = [
	{
		chainId: "1",
		symbol: "USDC",
		address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
		price: 1.0,
	},
	{
		chainId: "8453",
		symbol: "USDC",
		address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
		price: 1.0,
	},
	{
		chainId: "1",
		symbol: "USDT",
		address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
		price: 1.0,
	},
	{
		chainId: "8453",
		symbol: "USDT",
		address: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
		price: 1.0,
	},
	{
		symbol: "OP",
		chainId: "10",
		address: "0x4200000000000000000000000000000000000042",
		price: 2.1,
	},
];

export const TOKEN_BALANCES_MULTIPLE_STABLECOINS = [
	{
		chainId: "1",
		address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
		decimals: 6,
		amount: 111111,
		symbol: "USDC",
		name: "USD Coin",
	},
	{
		chainId: "8453",
		address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
		decimals: 6,
		amount: 222222,
		symbol: "USDC",
		name: "USD Coin",
	},
	{
		chainId: "1",
		address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
		symbol: "USDT",
		decimals: 6,
		amount: 333333,
		name: "USD Tether",
	},

	{
		chainId: "1",
		address: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
		symbol: "USDT",
		decimals: 6,
		amount: 444444,
		name: "USD Tether",
	},

	{
		chainId: "10",
		address: "0x4200000000000000000000000000000000000042",
		symbol: "OP",
		decimals: 6,
		amount: 555555,
		name: "Optimism",
	},
];
