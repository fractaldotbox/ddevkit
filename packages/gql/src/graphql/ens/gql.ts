/* eslint-disable */
import * as types from './graphql';



const documents = {}
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}
