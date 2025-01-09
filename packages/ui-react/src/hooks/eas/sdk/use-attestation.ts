import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { NO_EXPIRATION } from "@geist/ui-react/lib/eas/request";
import type { AttestationRequestData } from "@geist/ui-react/lib/eas/viem/onchain";
import { type Signer, ZeroHash } from "ethers";
import { useMemo } from "react";
import {
	Account,
	type Address,
	type Chain,
	Hex,
	createWalletClient,
	stringToHex,
	zeroHash,
} from "viem";
import { EAS_CONTRACT_ADDRESS } from "#lib/eas/abi";
import { createAttestationOnchain, createEAS } from "#lib/eas/sdk/eas";

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
			refUID = ZeroHash,
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
				signer,
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
