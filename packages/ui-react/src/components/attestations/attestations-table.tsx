import { Badge } from "#components/shadcn/badge";
import { DataTable } from "#components/data-table";
import { useGetAttestations } from "#lib/eas/get-attestations";
import {
	getEasscanAddressUrl,
	getEasscanAttestationUrl,
	getEasscanSchemaUrl,
} from "#lib/eas/util";
import { truncate } from "#utils/hex";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Address, fromBlobs } from "viem";
import { mainnet } from "viem/chains";
import { useChainId } from "wagmi";
import { SchemaBadge } from "./SchemaBadge";
import { AttestationMeta } from "./attestations";
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
				<SchemaBadge
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
