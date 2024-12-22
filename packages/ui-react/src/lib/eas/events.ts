import { TransactionReceipt, parseEventLogs } from "viem";
import { EAS_ABI } from "./abi";

export enum Event {
	Attested = "Attested",
	Timestamped = "Timestamped",
	RevokedOffchain = "RevokedOffchain",
}

// Model after eas-sdk/src/utils.ts

function parseTransformEvent<T>(eventName: Event, fx: (event: any) => T) {
	return (receipt: TransactionReceipt) => {
		const logs = parseEventLogs({
			abi: EAS_ABI,
			eventName,
			logs: receipt.logs,
		});
		return logs.map(fx);
	};
}

export const getUIDsFromAttestReceipt = (receipt: TransactionReceipt) => {
	return parseTransformEvent(Event.Attested, (event) => event.data)(receipt);
};

export const getTimestampFromTimestampReceipt = (
	receipt: TransactionReceipt,
) => {
	return parseTransformEvent(Event.Timestamped, (event) =>
		BigInt(event.timestamp),
	)(receipt);
};

export const getTimestampOffchainRevocationReceipt = (
	receipt: TransactionReceipt,
) => {
	return parseTransformEvent(Event.RevokedOffchain, (event) =>
		BigInt(event.timestamp),
	)(receipt);
};
