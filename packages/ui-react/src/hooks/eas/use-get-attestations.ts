import { gql } from "@geist/graphql";
import type { Attestation } from "@geist/graphql/eas/graphql";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { rawRequest, request } from "graphql-request";
import type { Address } from "viem";
import { getEasscanEndpoint } from "#lib/eas/easscan";

const allAttestationsByQuery = gql(`
  query allAttestationsBy(
    $where: AttestationWhereInput
  ) {
    attestations(where: $where) {
      id
      txid
      recipient
      schema {
        index
        schemaNames {
          name
        }
      }
      time
      isOffchain
      schemaId
      attester
    }
  }
`);

export type UseGetAttestationsParams = {
	chainId: number;
	address: Address;
};

export type UseGetAttestationsReturnType = UseQueryResult<Attestation[], Error>;

export const useGetAttestations = ({
	chainId,
	address,
}: UseGetAttestationsParams): UseGetAttestationsReturnType => {
	// https://github.com/dotansimha/graphql-code-generator/blob/master/examples/react/tanstack-react-query/src/use-graphql.ts

	const results = useQuery({
		queryKey: ["attestations", chainId, address],
		queryFn: async () =>
			rawRequest<Attestation[]>(
				`${getEasscanEndpoint(chainId)}/graphql`,
				allAttestationsByQuery.toString(),
				{
					where: {
						attester: {
							in: [address],
						},
					},
				},
			).then(({ data }) => data),
	});

	return results;
};
