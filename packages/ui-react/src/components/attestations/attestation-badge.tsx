import { useChainId } from "wagmi";
import { Badge } from "#components/shadcn/badge";
import { useGetAttestations } from "#lib/eas/get-attestations";

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
