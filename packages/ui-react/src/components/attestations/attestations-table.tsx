import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { type Address, fromBlobs } from "viem";
import { mainnet } from "viem/chains";
import { useChainId } from "wagmi";
import { DataTable } from "#components/data-table";
import { useGetAttestations } from "#hooks/eas/use-get-attestations";
import { getEasscanAttestationUrl } from "#lib/eas/easscan";
import { truncate } from "#lib/utils/hex";
import { AttestationSchemaBadge } from "./attestation-schema-badge";
import type { AttestationMeta } from "./attestations";
import { asAttestationMeta } from "./attestations";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// customize column with url getEasscanSchemaUrl()

export const columns: ColumnDef<AttestationMeta>[] = [
	{
		accessorKey: "id",
		header: "UID",
		cell: ({ row }) => {
			const id = row.getValue<string>("id");

			return (
				<a
					href={getEasscanAttestationUrl(
						mainnet.id,
						id,
						row.original.isOffchain,
					)}
					target="_blank"
				>
					{truncate(id)}
				</a>
			);
		},
	},
	{
		accessorKey: "schemaId",
		header: "Schema",
		cell: ({ row }) => {
			const schemaId = row.getValue<string>("schemaId");
			const schemaIndex = row.original.schemaIndex;

			return (
				<AttestationSchemaBadge
					chainId={mainnet.id}
					schemaId={schemaId}
					schemaIndex={schemaIndex}
				/>
			);
		},
	},
	{
		accessorKey: "from",
		header: "From",
	},

	{
		accessorKey: "to",
		header: "To",
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => {
			const isOffchain = row.original.isOffchain;

			return isOffchain ? "offchain" : "onchain";
		},
	},
	{
		accessorKey: "ageDisplayed",
		header: "Age",
	},
];

// https://easscan.org/
export const AttestationsTable = ({
	address,
}: {
	address: Address;
}) => {
	const chainId = useChainId();
	const { data, isLoading } = useGetAttestations({
		chainId,
		address,
	});

	const records = useMemo(() => {
		if (!data?.data) {
			return [];
		}
		return data?.data.attestations?.map(asAttestationMeta);
	}, [data]);

	return (
		<div>
			<DataTable columns={columns} data={records} />
		</div>
	);
};
