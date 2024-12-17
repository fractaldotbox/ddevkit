import { Chain } from "viem/chains";
import { Badge } from "#components/shadcn/badge";
import { getEasscanSchemaUrl } from "#lib/eas/util";

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
