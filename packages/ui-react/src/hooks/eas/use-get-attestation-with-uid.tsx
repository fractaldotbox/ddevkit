import { type Attestation } from "@geist/graphql/eas/graphql";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { gql, rawRequest } from "graphql-request";
import { getEasscanEndpoint } from "#lib/eas/easscan";

// export type AttestationByIdResponse = {
// 	attestation: {
// 		id: string;
// 		txid: string;
// 		recipient: string;
// 		schema: {
// 			index: number;
// 			schemaNames: {
// 				name: string;
// 			}[];
// 		};
// 		time: string; // Assuming time is returned as a string (e.g., ISO 8601 format)
// 		isOffchain: boolean;
// 		schemaId: string;
// 		attester: string;
// 	} | null; // In case attestation can be null
// };

const allAttestationsByQuery = gql`
  query AttestationById($where: AttestationWhereUniqueInput!) {
    attestation(where: $where) {
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
`;

export type UseGetAttestationParams = {
	uid: string;
	chainId: number;
};

export type UseGetAttestationsReturnType = UseQueryResult<Attestation, Error>;

export const createGetAttestationWithUidQueryOptions = ({
	uid,
	chainId,
}: UseGetAttestationParams) => {
	return {
		queryKey: ["attestation", chainId, uid],
		queryFn: async () =>
			rawRequest(
				`${getEasscanEndpoint(chainId)}/graphql`,
				allAttestationsByQuery.toString(),
				{
					where: {
						id: uid,
					},
				},
			),
	};
};

export const useGetAttestationWithUid = ({
	uid,
	chainId,
}: UseGetAttestationParams): UseGetAttestationsReturnType => {
	const queryOptions = createGetAttestationWithUidQueryOptions({
		uid,
		chainId,
	});

	return useQuery(queryOptions);
};
