import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import type { Signer } from "ethers";
import { useMemo } from "react";
import {
	type Account,
	type Address,
	type Chain,
	type Hex,
	createWalletClient,
	stringToHex,
	zeroHash,
} from "viem";
import { EAS_CONTRACT_ADDRESS } from "#lib/eas/abi";
import { NO_EXPIRATION } from "#lib/eas/request";
import { createAttestationOnchain, createEAS } from "#lib/eas/sdk/eas";
import type { AttestationRequestData } from "#lib/eas/viem/onchain";

export type UseAttestationEasSdkParams = {
	signer: Signer;
	chain: Chain;
	isOffchain: boolean;
	schemaId: string;
	schemaString: string;
};

export const useAttestationEasSdk = (params: UseAttestationEasSdkParams) => {
	const { signer, chain, isOffchain, schemaId, schemaString } = params;

	// TODO resolve by chain

	const eas = createEAS(EAS_CONTRACT_ADDRESS, signer);

	const schemaEncoder = useMemo(() => {
		return new SchemaEncoder(schemaString || "");
	}, [schemaString]);

	const signAttestation = async (requestParams: AttestationRequestData) => {
		if (!schemaString) {
			throw new Error("schemaString is required");
		}
		// TODO fix encode data structure
		const now = BigInt(Date.now());

		const {
			recipient,
			revocable = false,
			expirationTime = NO_EXPIRATION,
			refUID = zeroHash,
			data,
			salt,
		} = requestParams;

		const encodedData = schemaEncoder.encodeData(data);

		if (isOffchain) {
			console.log("create offchain attestation", data);

			const offchain = await eas.getOffchain();

			const attesterAddress = (await signer.getAddress()) as Address;

			const attestation = await offchain.signOffchainAttestation(
				{
					schema: schemaId,
					recipient,
					time: now,
					expirationTime,
					revocable,
					refUID,
					data: encodedData,
					salt,
				},
				signer as any,
			);

			const { uid } = attestation;

			return {
				uids: [uid],
			};
		}

		return createAttestationOnchain({
			eas,
			schemaString,
			encodedData,
			schemaUID: schemaId,
			attestationData: {
				recipient,
				revocable,
				expirationTime,
			},
		});
	};
	return {
		signAttestation,
	};
};
