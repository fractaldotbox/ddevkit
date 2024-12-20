import {
	EAS,
	NO_EXPIRATION,
	SchemaEncoder,
	SchemaValue,
} from "@ethereum-attestation-service/eas-sdk";
import { Signer } from "ethers";

export type reateAttestationRequestParams = any;

export interface SchemaItem {
	name: string;
	type: string;
	value: SchemaValue;
}

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
	encodedData,
	schemaUID,
}: any) => {
	const transaction = await eas.attest({
		schema: schemaUID,
		data: {
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
}: any) => {
	return {
		uid: "",
	};
};
