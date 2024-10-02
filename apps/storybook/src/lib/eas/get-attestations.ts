import { gql, request } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { graphql } from '@repo/gql'
import { Address, Hex } from 'viem'

// gql works
// Invalid AST Node: {}
// for generated graphql(``)

// const allAttestationsByQuery = gql`
//   query allAttestationsBy(
//     $where: AttestationWhereInput
//   ) {
//     attestations(where: $where) {
//       id
//       txid
//       schemaId
//       attester
//     }
//   }
// `

const allAttestationsByQuery = graphql(`
  query allAttestationsBy(
    $where: AttestationWhereInput
  ) {
    attestations(where: $where) {
      id
      txid
      schemaId
      attester
    }
  }
`)


// Invalid AST Node: {}

export const useGetAttestations =  (
    {
        chainId,
        address
    }:{
        chainId:number,
        address:Address
    }
)=>{

  // ignore the execution fn
  console.log('useGetAttestations', chainId, address)
 const results = useQuery({
    queryKey: ['attestations', chainId, address],
    queryFn: async () =>
      request(
        'https://easscan.org/graphql',
        allAttestationsByQuery,
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