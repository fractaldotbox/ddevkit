/* eslint-disable */
import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
	"\n  query allAttestationsBy(\n    $where: AttestationWhereInput\n  ) {\n    attestations(where: $where) {\n      id\n      txid\n      recipient\n      schema {\n        index\n        schemaNames {\n          name\n        }\n      }\n      time\n      isOffchain\n      schemaId\n      attester\n    }\n  }\n":
		types.AllAttestationsByDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: "\n  query allAttestationsBy(\n    $where: AttestationWhereInput\n  ) {\n    attestations(where: $where) {\n      id\n      txid\n      recipient\n      schema {\n        index\n        schemaNames {\n          name\n        }\n      }\n      time\n      isOffchain\n      schemaId\n      attester\n    }\n  }\n",
): typeof import("./graphql").AllAttestationsByDocument;

export function gql(source: string) {
	return (documents as any)[source] ?? {};
}
