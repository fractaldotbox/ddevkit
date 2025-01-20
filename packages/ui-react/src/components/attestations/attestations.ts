import { format, formatDistance, subDays } from "date-fns";
import type { Address } from "viem";
import type { AttestationQueryResult } from "#hooks/eas/use-get-attestations";

// TODO sync graphql type
export const asAttestationMeta = (attestation: AttestationQueryResult) => {
	const {
		id,
		attester,
		recipient,
		schemaId,
		schema,
		txid,
		isOffchain,
		time: _time,
	} = attestation;
	const schemaName = schema?.schemaNames?.[0]?.name;
	const time = _time || new Date().getTime();
	// TODO component take control of format/locales
	const ageDisplayed = formatDistance(new Date(time * 1000), new Date());
	return {
		id,
		schemaId,
		schemaIndex: schema?.index,
		schemaName,
		from: attester as Address,
		to: recipient as Address,
		isOffchain,
		txid,
		time,
		ageDisplayed,
	};
};

export type AttestationMeta = {
	id: string;
	schemaId: string;
	schemaIndex: string;
	schemaName: string;
	from: Address;
	to: Address;
	time: number;
	isOffchain: boolean;
	ageDisplayed: string;
	txid: string;
};

export type UploadAttestationParams = {
	uid?: string;
	chainId?: number;
	payload?: any;
	isEncrypted?: boolean;
};
