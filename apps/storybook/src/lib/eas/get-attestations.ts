import { request, rawRequest } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import { gql } from '@repo/graphql'
import { Address, Hex } from 'viem'
import { AllAttestationsByQuery } from 'node_modules/@repo/graphql/src/graphql/graphql';

// TODO consider schema names or separate query
// schema {
//   id
//   schemaNames {
//     name
//   }
// }

const allAttestationsByQuery = gql(`
  query allAttestationsBy(
    $where: AttestationWhereInput
  ) {
    attestations(where: $where) {
      id
      txid
      recipient
      time
      isOffchain
      schemaId
      attester
    }
  }
`);

export type AttestationQueryResult = AllAttestationsByQuery['attestations'][0]


// TODO type safety
export const useGetAttestations =  (
    {
        chainId,
        address
    }:{
        chainId:number,
        address:Address
    }
)=>{


  // https://github.com/dotansimha/graphql-code-generator/blob/master/examples/react/tanstack-react-query/src/use-graphql.ts

  // To confirm schema consistency across multiple chains
  console.log('useGetAttestations', chainId, address)
 const results = useQuery({
    queryKey: ['attestations', chainId, address],
    queryFn: async () =>
      rawRequest<AllAttestationsByQuery>(
        'https://easscan.org/graphql',
        allAttestationsByQuery.toString(),
        {
          "where": {
            "attester": {
              "in": [address]
            }
          } 
        }
      ),
  });

  console.log('results', results, results?.isLoading, results?.error, results?.data)
  return results;
}