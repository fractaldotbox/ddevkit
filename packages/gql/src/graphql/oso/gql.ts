/* eslint-disable */
import * as types from './graphql';



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
    "\n  query CodeMetricsByProject($where: Oso_CodeMetricsByProjectV1BoolExp!) {\n\toso_codeMetricsByProjectV1(where: $where) {\n\t\tprojectId\n\t\tprojectName\n\t\tdisplayName\n\t\tactiveDeveloperCount6Months\n\t\tclosedIssueCount6Months\n\t\tcommentCount6Months\n\t\tcommitCount6Months\n\t\tcontributorCount\n\t\tcontributorCount6Months\n\t\tdeveloperCount\n\t\teventSource\n\t\tforkCount\n\t\tfulltimeDeveloperAverage6Months\n\t\tlastCommitDate\n\t\tlastUpdatedAtDate\n\t\tmergedPullRequestCount6Months\n\t\tnewContributorCount6Months\n\t\topenedIssueCount6Months\n\t\topenedPullRequestCount6Months\n\n\t\tprojectNamespace\n\t\tprojectSource\n\t\treleaseCount6Months\n\t\trepositoryCount\n\t\tstarCount\n\t}\n  }\n": types.CodeMetricsByProjectDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CodeMetricsByProject($where: Oso_CodeMetricsByProjectV1BoolExp!) {\n\toso_codeMetricsByProjectV1(where: $where) {\n\t\tprojectId\n\t\tprojectName\n\t\tdisplayName\n\t\tactiveDeveloperCount6Months\n\t\tclosedIssueCount6Months\n\t\tcommentCount6Months\n\t\tcommitCount6Months\n\t\tcontributorCount\n\t\tcontributorCount6Months\n\t\tdeveloperCount\n\t\teventSource\n\t\tforkCount\n\t\tfulltimeDeveloperAverage6Months\n\t\tlastCommitDate\n\t\tlastUpdatedAtDate\n\t\tmergedPullRequestCount6Months\n\t\tnewContributorCount6Months\n\t\topenedIssueCount6Months\n\t\topenedPullRequestCount6Months\n\n\t\tprojectNamespace\n\t\tprojectSource\n\t\treleaseCount6Months\n\t\trepositoryCount\n\t\tstarCount\n\t}\n  }\n"): typeof import('./graphql').CodeMetricsByProjectDocument;


export function gql(source: string) {
  return (documents as any)[source] ?? {};
}
