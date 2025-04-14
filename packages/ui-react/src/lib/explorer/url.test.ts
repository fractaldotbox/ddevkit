import { BY_USER, TRANSACTION } from "@geist/domain/user.fixture";
import { filecoin, filecoinCalibration, mainnet, sepolia } from "viem/chains";
import { describe, expect, test } from "vitest";
import { createOverrideStrategies as createBlockscoutOverrideStrategies } from "#lib/blockscout/url";
import {
	Explorer,
	ExplorerEntity,
	blockExplorerUrlFactory,
} from "#lib/explorer/url";
import { createOverrideStrategies as createFilecoinOverrideStrategies } from "#lib/filecoin/url";

describe("BlockExplorer", () => {
	test.each([
		[
			mainnet,
			ExplorerEntity.Transaction,
			{
				txnHash: TRANSACTION.VITALIK_TRANSFER.txnHash,
			},
			{
				name: Explorer.Etherscan,
			},
			"https://etherscan.io/tx/0xed46c306a58821dd2dcbc78d7b7af9715c809c71d7a53b0dfc90c42dfdf59b67",
		],
		[
			mainnet,
			ExplorerEntity.Transaction,
			{
				txnHash: TRANSACTION.VITALIK_TRANSFER.txnHash,
			},
			null,
			"https://eth.blockscout.com/tx/0xed46c306a58821dd2dcbc78d7b7af9715c809c71d7a53b0dfc90c42dfdf59b67",
		],
		[
			mainnet,
			ExplorerEntity.Address,
			{
				address: BY_USER.vitalik.address,
			},
			{
				name: Explorer.Etherscan,
			},
			"https://etherscan.io/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		],
		[
			mainnet,
			ExplorerEntity.Address,
			{
				address: BY_USER.vitalik.address,
			},
			{
				name: Explorer.Etherscan,
			},
			"https://etherscan.io/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		],
		[
			sepolia,
			ExplorerEntity.Address,
			{
				address: BY_USER.vitalik.address,
			},
			{
				name: Explorer.Blockscout,
			},
			"https://eth-sepolia.blockscout.com/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		],
		[
			filecoin,
			ExplorerEntity.Address,
			{
				address: BY_USER.filecoinTopHolder.filAddress,
			},
			{
				name: Explorer.Filfox,
				locale: "en",
			},
			"https://filfox.info/en/address/f1m2swr32yrlouzs7ijui3jttwgc6lxa5n5sookhi",
		],

		// This is necessary to override 1. use filfox over filescan 2. locale
		[
			filecoinCalibration,
			ExplorerEntity.Address,
			{
				address: BY_USER.filecoinTopHolder.filAddress,
			},
			{
				name: Explorer.Filfox,
				locale: "zh",
			},
			"https://calibration.filfox.info/zh/address/f1m2swr32yrlouzs7ijui3jttwgc6lxa5n5sookhi",
		],
	])("#createBlockExplorerUrl", (chain, entity, params, config, expected) => {
		const name = config?.name || Explorer.Blockscout;
		const defaultConfig = [Explorer.Blockscout, Explorer.Filfox].includes(name)
			? {
					overrideStrategies: {
						...createFilecoinOverrideStrategies(),
						...createBlockscoutOverrideStrategies(),
					},
				}
			: {};

		const createUrl = blockExplorerUrlFactory({
			chain,
			config: {
				name,
				...defaultConfig,
				...config,
			},
		});

		const url = createUrl({ chain, entity, params });
		expect(url).toEqual(expected);
	});
});
