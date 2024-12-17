import { gql, rawRequest } from "graphql-request";

export type AttestationByIdResponse = {
	attestation: {
		id: string;
		txid: string;
		recipient: string;
		schema: {
			index: number;
			schemaNames: {
				name: string;
			}[];
		};
		time: string; // Assuming time is returned as a string (e.g., ISO 8601 format)
		isOffchain: boolean;
		schemaId: string;
		attester: string;
	} | null; // In case attestation can be null
};

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

export const getAttestationWithUid = async (uid: string, chainId: number) => {
	const response = await rawRequest<AttestationByIdResponse>(
		`${getEasscanEndpoint(chainId)}/graphql`,
		allAttestationsByQuery.toString(),
		{
			where: {
				id: uid,
			},
		},
	);

	return response.data;
};
