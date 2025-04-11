## CONTRIBUTING


### Repository setup and structure


#### Bundler / ESM

- we do not intend to publish most components as library, we do not bundle and transpile to cjs
- At components/agents receipes we prefer to compile components just-in-time, so as to benefit performance by avoiding intermediate build step
- We allow end-application to use bundler of choice, while for now esm is a must. We could create receipes for compiling commonjs with tsbuild.


### path alias
- shadn use alias at `components.json`  ([reference](https://turbo.build/repo/docs/guides/tools/typescript#use-nodejs-subpath-imports-instead-of-typescript-compiler-paths)) 
- tsconfig paths alias is not sufficient and we use nodejs subpath imports
i.e. imports at package.json for the # alias
to support IDE, we need array with explicit extension. Note order matters so IDE can process accordingly

```
	"imports": {
		"#*": ["./src/*", "./src/*.tsx"]
	},
```



### IDE config

This is expected for auto import to work.

- `includePackageJsonAutoImports` is to trade off performance for full search on paths for all internal packages, so as to support wildcard import

-  `importModuleSpecifierEnding` is to avoid automatically adding `.js` extension, , although in practice we find it a bit fuzzy



```
	"typescript.preferences.includePackageJsonAutoImports": "on",
	"typescript.preferences.importModuleSpecifierEnding": "minimal",
```

### Env config

- Environment variables are namespaced and configured via the canonical util config file `packages/domain/src/config.ts`
- Refers to `env.sample` to create `.env` file. 
  -  To align common convention and be agnostic across various build environment, currently prefix like `VITE` or `STORYBOOK` is not required. 

- Avoid loading environment directly at components / libs (e.g. process.env) and always prefer injecting config 
- `process.env` is defined explicitly at [Vite config](https://vite.dev/config/). 
 At storybook / vitest it is injected at config and picked up via vite loader `loadEnv`.

- we could consider use of [defu](https://github.com/unjs/defu) to merge config


### Vite config
- We could consider to share a base [project root config](https://vite.dev/config/#configuring-vite)
- to be customized for dom based testing at storybook / ui-react packages
  - for now we install related dependencies at root


### Package Versioning

This project uses [changesets](https://github.com/changesets/changesets) for package versioning and publishing. When making changes:

1. Run `pnpm changeset` to create a new changeset
2. Follow the prompts to describe your changes
3. Commit the generated changeset file

For more details on using changesets, refer to the [official documentation](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md).
