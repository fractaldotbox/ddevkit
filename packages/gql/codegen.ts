import type { CodegenConfig } from '@graphql-codegen/cli'
 



// Document mode is used for smaller bundle size
// https://github.com/mswjs/msw/issues/1583

// https://github.com/dotansimha/graphql-code-generator/discussions/8707

const config: CodegenConfig = {
  // schema: 'https://easscan.org/graphql/index',
  // documents: ['../../apps/storybook/src/**/*.ts','../../apps/storybook/src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/eas/': {
      preset: 'client',
      documents: ['../../apps/storybook/src/lib/eas/**/*.ts'],
      schema: 'https://easscan.org/graphql',
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        documentMode: 'string'
      }
    },
    './src/graphql/ens/': {
      preset: 'client',
      documents: ['../../apps/storybook/src/lib/ens/**/*.ts'],
      schema: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        documentMode: 'string'
      }
    },
    // './schema.graphql': {
    //   plugins: ['schema-ast'],
    //   config: {
    //     includeDirectives: true
    //   }
    // }
  }
}

// 
 
export default config