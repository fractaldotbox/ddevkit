import { Badge } from "#components/ui/badge.tsx";
import { useGetAttestations } from "#lib/eas/get-attestations.tsx";
import { useChainId } from "wagmi";

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
		address: addressOrEns,
	});

	return <Badge>Translator</Badge>;
}
