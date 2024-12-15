import { Badge } from "#components/ui/badge";
import { getEasscanSchemaUrl } from "#lib/eas/util";
import { Chain } from "viem/chains";

export const SchemaBadge = ({
	chainId,
	schemaId,
	schemaIndex,
}: { chainId: number; schemaId: string; schemaIndex: string }) => {
	return (
		<a href={getEasscanSchemaUrl(chainId, schemaId)} target="_blank">
			<Badge>#{schemaIndex}</Badge>
		</a>
	);
};
