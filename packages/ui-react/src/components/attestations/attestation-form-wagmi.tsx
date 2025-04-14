import type { AttestationRequestData } from "@ethereum-attestation-service/eas-sdk";
import type { Account, Chain } from "viem";
import { useAttestation } from "#hooks/eas/use-attestation";
import { AttestationForm } from "./attestation-form";

export const AttestationFormWagmi = ({
	schemaId,
	schemaIndex,

	account,
	isOffchain,
	schemaString,
	chain,
	data,
	attestData,
}: {
	schemaId: string;
	schemaIndex: string;
	account: Account;
	isOffchain: boolean;
	schemaString: string;
	chain: Chain;
	data: any;
	attestData: Omit<AttestationRequestData, "recipient">;
}) => {
	if (!account) {
		return;
	}

	const { signAttestation } = useAttestation({
		account,
		isOffchain,
		schemaId,
		schemaString,
		chain,
	});

	const recipient = "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165" as Address;

	return (
		<AttestationForm
			chainId={chain.id}
			schemaId={schemaId}
			schemaIndex={schemaIndex}
			isOffchain={isOffchain}
			signAttestation={async () =>
				signAttestation({
					...attestData,
					data,
					recipient,
					// attester: account.address,
				})
			}
		/>
	);
};
