import { create } from "multiformats/hashes/digest";
import { describe, expect, test } from "vitest";
import { createBlockExplorerUrl, Explorer, ExplorerEntity } from "./url";
import { mainnet, sepolia } from "viem/chains";
import { BY_USER, TRANSACTION } from "@/stories/fixture";

describe("BlockExplorer", () => {
	test.each([
		[
			mainnet,
			ExplorerEntity.Transaction,
			{
				txnHash: TRANSACTION.VITALIK_TRANSFER.txnHash,
			},
			Explorer.Etherscan,
			"https://etherscan.io/tx/0xed46c306a58821dd2dcbc78d7b7af9715c809c71d7a53b0dfc90c42dfdf59b67",
		],
		[
			mainnet,
			ExplorerEntity.Transaction,
			{
				txnHash: TRANSACTION.VITALIK_TRANSFER.txnHash,
			},
			Explorer.Blockscout,
			"https://eth.blockscout.com/tx/0xed46c306a58821dd2dcbc78d7b7af9715c809c71d7a53b0dfc90c42dfdf59b67",
		],
		[
			mainnet,
			ExplorerEntity.Address,
			{
				address: BY_USER.vitalik.address,
			},
			Explorer.Etherscan,
			"https://etherscan.io/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		],
		[
			mainnet,
			ExplorerEntity.Address,
			{
				address: BY_USER.vitalik.address,
			},
			Explorer.Blockscout,
			"https://eth.blockscout.com/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		],
		[
			sepolia,
			ExplorerEntity.Address,
			{
				address: BY_USER.vitalik.address,
			},
			Explorer.Blockscout,
			"https://eth-sepolia.blockscout.com/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		],
	])("#createBlockExplorerUrl", (chain, entity, params, explorer, expected) => {
		expect(
			createBlockExplorerUrl({
				chain,
				entity,
				params,
				explorer,
			}),
		).toEqual(expected);
	});
});
