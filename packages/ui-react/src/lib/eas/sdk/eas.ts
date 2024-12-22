import {
	EAS,
	NO_EXPIRATION,
	SchemaEncoder,
	SchemaValue,
} from "@ethereum-attestation-service/eas-sdk";
import { Signer } from "ethers";

export type CreateAttestationRequestParams = any;

export interface SchemaItem {
	name: string;
	type: string;
	value: SchemaValue;
}

export const createEAS = (EASContractAddress: string, signer: Signer) => {
	return new EAS(EASContractAddress).connect(signer);
};

export const createAttestationOnchain = async ({
	eas,
	encodedData,
	schemaUID,
	attestationData,
}: any) => {
	const transaction = await eas.attest({
		schema: schemaUID,
		data: {
			...attestationData,
			data: encodedData,
		},
	});

	const newAttestationUID = await transaction.wait();

	console.log(transaction);
	return {
		uids: [newAttestationUID],
		txnReceipt: transaction.receipt,
	};
};
