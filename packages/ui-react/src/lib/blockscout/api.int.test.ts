import { getAddress } from "viem";
import { describe, expect, test } from "vitest";
import { asTransactionMeta, getAddressInfo, getTransaction } from "./api";
import { BY_TXN } from "./data.fixture";

describe("blockscout", () => {
	test.skip("api", async () => {
		const address = "0x962EFc5A602f655060ed83BB657Afb6cc4b5883F";

		const results = await getAddressInfo(address);
		console.log(results);
		const { ens_domain_name } = results;
		expect(ens_domain_name).toBe("debuggingfuture.eth");
	});

	test("getTransaction", async () => {
		const txnHash =
			"0xc6480de9e7ba4daa2bd115be1aa41c669246b052e6765a4848f8c683c63cacf7";

		const { from, to, tx_types } = await getTransaction(txnHash);
		expect(from.ens_domain_name).toBe("debuggingfuture.eth");
		expect(to.ens_domain_name).toBe(null);
		expect(tx_types).toEqual(["coin_transfer"]);
	});
});

// transaction_types

describe("Transaction", () => {
	test("#asTransactionMeta contract", () => {
		const transaction = asTransactionMeta(BY_TXN.VITALIK_DEPOSIT);

		expect(transaction.to).toEqual(
			"0xB4A8d45647445EA9FC3E1058096142390683dBC2",
		);

		expect(transaction.displayedTxType).toEqual("contract_call");

		expect(transaction.value).toEqual(32010000000000000000000000000n);
		expect(transaction.tokenTransfers?.[0]?.name).toEqual("Wrapped Ether");
	});
	test("#asTransactionMeta transfer", () => {
		const transaction = asTransactionMeta(BY_TXN.VITALIK_TRANSFER);

		expect(transaction.to).toEqual(
			"0x52a785cF0238D02e0F4157735f0a17D04AB2bF6c",
		);

		expect(transaction.displayedTxType).toEqual("coin_transfer");

		expect(transaction.value).toEqual(100000000000000000000000000000n);
		expect(transaction.tokenTransfers?.[0]).toEqual([]);
	});
});

// {
//     block_number_balance_updated_at: 21184382,
//     coin_balance: '2084671391552286312',
//     creation_transaction_hash: null,
//     creation_tx_hash: null,
//     creator_address_hash: null,
//     ens_domain_name: 'debuggingfuture.eth',
//     exchange_rate: '3170.33',
//     has_beacon_chain_withdrawals: false,
//     has_decompiled_code: false,
//     has_logs: false,
//     has_token_transfers: true,
//     has_tokens: true,
//     has_validated_blocks: false,
//     hash: '0x962EFc5A602f655060ed83BB657Afb6cc4b5883F',
//     implementations: [],
//     is_contract: false,
//     is_scam: false,
//     is_verified: false,
//     metadata: null,
//     name: null,
//     private_tags: [],
//     proxy_type: null,
//     public_tags: [],
//     token: null,
//     watchlist_address_id: null,
//     watchlist_names: []
//   }
