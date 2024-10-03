import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'https://easscan.org/graphql/index',
  documents: ['../../apps/storybook/src/**/*.ts','../../apps/storybook/src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    './introspection.json': {
      plugins: ['introspection'],
      config: {
        minify: true
      },
    },
    './src/graphql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        // smaller bundle size
        // https://github.com/mswjs/msw/issues/1583
        documentMode: 'string'
      }
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  }
}
 
export default config