import {
	EAS,
	NO_EXPIRATION,
	SchemaEncoder,
} from "@ethereum-attestation-service/eas-sdk";
import { Signer } from "ethers";

export type createAttestationParams = any;
export type createAttestationRequestParams = any;

// : {
//     EASContractAddress: string;
//     signer: JsonRpcSigner;
// }

export const createEAS = (EASContractAddress: string, signer: Signer) => {
	return new EAS(EASContractAddress).connect(signer);
};

export const createAttestationRequest = ({
	schemaUID,
	schemaString,
	encodedDataParams,
	attestationData,
}: createAttestationRequestParams) => {
	const schemaEncoder = new SchemaEncoder(schemaString);
	const encodedData = schemaEncoder.encodeData(encodedDataParams);

	return {
		schema: schemaUID,
		data: {
			...attestationData,
			data: encodedData,
		},
	};
};

export const createAttestationOnchain = async ({
	eas,
	schemaString,
	encodedDataParams,
	schemaUID,
	attestationData,
}: createAttestationParams) => {
	// Initialize SchemaEncoder with the schema string
	const schemaEncoder = new SchemaEncoder(schemaString);
	const encodedData = schemaEncoder.encodeData(encodedDataParams);

	const transaction = await eas.attest({
		schema: schemaUID,
		data: {
			...attestationData,
			data: encodedData,
		},
	});

	const newAttestationUID = await transaction.wait();

	return {
		uid: newAttestationUID,
	};
};

export const createAttestationOffchain = async ({
	// eas,
	// schemaString,
	// encodedDataParams,
	// schemaUID,
	// attestationData,
}: createAttestationParams) => {
	return {
		uid: "",
	};
};
