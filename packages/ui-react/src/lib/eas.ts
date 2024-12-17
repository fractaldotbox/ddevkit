import type { Signer } from "ethers";

export const ZERO_BYTES = "0x";
export const ZERO_BYTES32 =
	"0x0000000000000000000000000000000000000000000000000000000000000000";

export enum SignatureType {
	Direct = "direct",
	Delegated = "delegated",
	DelegatedProxy = "delegated-proxy",
	Offchain = "offchain",
}

interface RequestOptions {
	signatureType?: SignatureType;
	deadline?: bigint;
	from: Signer;
	value?: bigint;
	maxPriorityFeePerGas?: bigint | Promise<bigint>;
	maxFeePerGas?: bigint | Promise<bigint>;
}

export interface AttestationOptions extends RequestOptions {
	bump?: number;
}
