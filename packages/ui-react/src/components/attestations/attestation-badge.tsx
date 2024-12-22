import { Address } from "viem";
import { useChainId } from "wagmi";
import { Badge } from "#components/shadcn/badge";
import { useGetAttestations } from "#hooks/eas/get-attestations";

// TODO
export function AttestationBadge({
	addressOrEns,
	attestationSchemaId,
}: {
	addressOrEns: string;
	attestationSchemaId: string;
}) {
	//
	const chainId = useChainId();

	// TODO address from addressOrEns
	const { data, isSuccess } = useGetAttestations({
		chainId,
		address: addressOrEns as Address,
	});

	return <Badge>Translator</Badge>;
}
