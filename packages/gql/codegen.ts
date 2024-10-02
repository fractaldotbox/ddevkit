import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'https://easscan.org/graphql/index',
  documents: ['src/**/*.ts'],
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