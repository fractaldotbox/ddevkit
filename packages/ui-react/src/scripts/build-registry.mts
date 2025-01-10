// @sts-nocheck
import { promises as fs, existsSync, readFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import { cwd } from "process";
// import { rimraf } from "rimraf";
import { Project, ScriptKind, SyntaxKind } from "ts-morph";
import type { z } from "zod";

import { registry } from "../registry";
// import { baseColors } from "../registry/registry-base-colors";
// import { colorMapping, colors } from "../registry/registry-colors";
import { styles } from "../registry/registry-styles";
import {
	type Registry,
	type RegistryEntry,
	registryEntrySchema,
	type registryItemTypeSchema,
	registrySchema,
} from "../registry/schema";

const REGISTRY_EXPORT_ROOT = path.resolve(
	import.meta.dirname,
	"../../../../apps/geist",
);
const REGISTRY_EXPORT_PATH = path.join(REGISTRY_EXPORT_ROOT, "/public/r");
const REGISTRY_SOURCE_PATH = path.join(process.cwd(), "src");

console.log("registry export path", REGISTRY_EXPORT_PATH);

const REGISTRY_INDEX_WHITELIST: z.infer<typeof registryItemTypeSchema>[] = [
	"registry:ui",
	"registry:lib",
	"registry:hook",
];

const project = new Project({
	compilerOptions: {},
});

async function createTempSourceFile(filename: string) {
	const dir = await fs.mkdtemp(path.join(tmpdir(), "shadcn-"));
	return path.join(dir, filename);
}

function writeFileWithDirSync(filepath: string, data: any, options = {}) {
	// Ensure the directory exists
	const dirname = path.dirname(filepath);

	if (!existsSync(dirname)) {
		fs.mkdir(dirname, { recursive: true });
	}

	// Write the file
	fs.writeFile(filepath, data, options);
}

// for both export path and in dependencies

// TODO different at import path
const rewriteGeistDependencyPath = (pathInput: string) => {
	// TODO bulk regex
	if (pathInput.startsWith("./")) {
		const resolved = path.relative(REGISTRY_SOURCE_PATH, pathInput);

		// path input is re that file, use file path as input

		console.log("relative", pathInput, REGISTRY_SOURCE_PATH, resolved);
	}

	const pathRootMatch = pathInput.match(
		/^([?:\.\/|#])*(components|lib|hooks)\/(shadcn\/)*(.*)$/,
	);

	// console.log("relative path?", path, pathRootMatch?.[1]);

	const alias = pathRootMatch?.[1] === "#" ? "@/" : "";

	const modulePath =
		pathRootMatch?.[2] === "components" ? "components/ui" : pathRootMatch?.[2];

	if (pathRootMatch?.[0]) {
		return `${alias}${modulePath}/${pathRootMatch[4]?.replace(/\//g, "_")}`;
	}
	return pathInput;
};

// ----------------------------------------------------------------------------
// Build registry/styles/[style]/[name].json.
// ----------------------------------------------------------------------------
async function buildStyles(registry: Registry) {
	for (const style of styles) {
		const targetPath = path.join(REGISTRY_EXPORT_PATH, "styles", style.name);

		// Create directory if it doesn't exist.
		if (!existsSync(targetPath)) {
			await fs.mkdir(targetPath, { recursive: true });
		}

		for (const item of registry) {
			if (!REGISTRY_INDEX_WHITELIST.includes(item.type)) {
				continue;
			}

			let files;
			if (item.files) {
				files = await Promise.all(
					item.files.map(async (_file) => {
						const file =
							typeof _file === "string"
								? {
										path: _file,
										type: item.type,
										content: "",
										target: "",
									}
								: _file;

						const content = await fs.readFile(
							path.join(REGISTRY_SOURCE_PATH, file.path),
							"utf8",
						);

						const tempFile = await createTempSourceFile(file.path);
						const sourceFile = project.createSourceFile(tempFile, content, {
							scriptKind: ScriptKind.TSX,
						});

						sourceFile.getVariableDeclaration("iframeHeight")?.remove();
						sourceFile.getVariableDeclaration("containerClassName")?.remove();
						sourceFile.getVariableDeclaration("description")?.remove();

						// Replace shadcn imports
						console.log("content", file);
						for (const node of sourceFile.getImportDeclarations()) {
							const currentImport = node.getModuleSpecifier().getLiteralValue();

							const geistDependencyPath =
								rewriteGeistDependencyPath(currentImport);

							console.log("geistDependencyPath", geistDependencyPath);

							node
								.getModuleSpecifier()
								.replaceWithText(`"${geistDependencyPath}"`);
						}
						// find root to supporot unlimited level of nested folder

						let geistDependencyPath = rewriteGeistDependencyPath(file.path);

						console.log("path", geistDependencyPath);

						// TODO add registry url to registryDependencies

						return {
							path: geistDependencyPath,
							type: file.type,
							content: sourceFile.getText(),
							target: file.target,
						};
					}),
				);
			}

			const payload = registryEntrySchema
				.omit({
					source: true,
					category: true,
					subcategory: true,
					shadcnDependencies: true,
					chunks: true,
				})
				.safeParse({
					...item,
					files,
				});

			if (payload.success) {
				const shadcnRegistryUrl = "https://ui.shadcn.com/r";
				payload.data.registryDependencies = (
					payload.data.registryDependencies ?? []
				).concat(
					(item.shadcnDependencies ?? []).map(
						(dependency) =>
							`${shadcnRegistryUrl}/styles/${style.name}/${dependency}.json`,
					),
				);

				await writeFileWithDirSync(
					path.join(targetPath, `${item.name}.json`),
					JSON.stringify(payload.data, null, 2),
					"utf8",
				);
			}
		}
	}

	// ----------------------------------------------------------------------------
	// Build registry/styles/index.json.
	// ----------------------------------------------------------------------------
	const stylesJson = JSON.stringify(styles, null, 2);
	await fs.writeFile(
		path.join(REGISTRY_EXPORT_PATH, "styles/index.json"),
		stylesJson,
		"utf8",
	);
}

// ----------------------------------------------------------------------------
// Build registry/styles/[name]/index.json.
// ----------------------------------------------------------------------------
async function buildStylesIndex() {
	for (const style of styles) {
		const targetPath = path.join(REGISTRY_EXPORT_PATH, "styles", style.name);

		const dependencies = [
			"tailwindcss-animate",
			"class-variance-authority",
			"lucide-react",
		];

		const payload: RegistryEntry = {
			name: style.name,
			type: "registry:style",
			dependencies,
			registryDependencies: ["utils"],
			tailwind: {
				config: {
					plugins: [`require("tailwindcss-animate")`],
				},
			},
			cssVars: {},
			files: [],
		};

		await fs.writeFile(
			path.join(targetPath, "index.json"),
			JSON.stringify(payload, null, 2),
			"utf8",
		);
	}
}

// ----------------------------------------------------------------------------
// Build __registry__/index.tsx.
// ----------------------------------------------------------------------------
async function buildRegistry(registry: Registry) {
	let index = `// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {
`;

	for (const style of styles) {
		index += `  "${style.name}": {`;

		// Build style index.
		for (const item of registry) {
			const resolveFiles = item.files?.map(
				(file) =>
					`registry/${style.name}/${
						typeof file === "string" ? file : file.path
					}`,
			);
			if (!resolveFiles) {
				continue;
			}

			const type = item.type.split(":")[1];
			let sourceFilename = "";

			let chunks: any = [];
			if (item.type === "registry:block") {
				const file = resolveFiles[0];
				const filename = path.basename(file);
				const raw = await fs.readFile(file, "utf8");
				const tempFile = await createTempSourceFile(filename);
				const sourceFile = project.createSourceFile(tempFile, raw, {
					scriptKind: ScriptKind.TSX,
				});

				// Find all imports.
				const imports = new Map<
					string,
					{
						module: string;
						text: string;
						isDefault?: boolean;
					}
				>();
				sourceFile.getImportDeclarations().forEach((node) => {
					const module = node.getModuleSpecifier().getLiteralValue();
					node.getNamedImports().forEach((item) => {
						imports.set(item.getText(), {
							module,
							text: node.getText(),
						});
					});

					const defaultImport = node.getDefaultImport();
					if (defaultImport) {
						imports.set(defaultImport.getText(), {
							module,
							text: defaultImport.getText(),
							isDefault: true,
						});
					}
				});

				// Find all opening tags with x-chunk attribute.
				const components = sourceFile
					.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
					.filter((node) => {
						return node.getAttribute("x-chunk") !== undefined;
					});

				chunks = await Promise.all(
					components.map(async (component, index) => {
						const chunkName = `${item.name}-chunk-${index}`;

						// Get the value of x-chunk attribute.
						const attr = component
							.getAttributeOrThrow("x-chunk")
							.asKindOrThrow(SyntaxKind.JsxAttribute);

						const description = attr
							.getInitializerOrThrow()
							.asKindOrThrow(SyntaxKind.StringLiteral)
							.getLiteralValue();

						// Delete the x-chunk attribute.
						attr.remove();

						// Add a new attribute to the component.
						component.addAttribute({
							name: "x-chunk",
							initializer: `"${chunkName}"`,
						});

						// Get the value of x-chunk-container attribute.
						const containerAttr = component
							.getAttribute("x-chunk-container")
							?.asKindOrThrow(SyntaxKind.JsxAttribute);

						const containerClassName = containerAttr
							?.getInitializer()
							?.asKindOrThrow(SyntaxKind.StringLiteral)
							.getLiteralValue();

						containerAttr?.remove();

						const parentJsxElement = component.getParentIfKindOrThrow(
							SyntaxKind.JsxElement,
						);

						// Find all opening tags on component.
						const children = parentJsxElement
							.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
							.map((node) => {
								return node.getTagNameNode().getText();
							})
							.concat(
								parentJsxElement
									.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
									.map((node) => {
										return node.getTagNameNode().getText();
									}),
							);

						const componentImports = new Map<
							string,
							string | string[] | Set<string>
						>();
						children.forEach((child) => {
							const importLine = imports.get(child);
							if (importLine) {
								const imports = componentImports.get(importLine.module) || [];

								const newImports = importLine.isDefault
									? importLine.text
									: new Set([...imports, child]);

								componentImports.set(
									importLine.module,
									importLine?.isDefault ? newImports : Array.from(newImports),
								);
							}
						});

						const componnetImportLines = Array.from(
							componentImports.keys(),
						).map((key) => {
							const values = componentImports.get(key);
							const specifier = Array.isArray(values)
								? `{${values.join(",")}}`
								: values;

							return `import ${specifier} from "${key}"`;
						});

						const code = `
            'use client'

            ${componnetImportLines.join("\n")}

            export default function Component() {
              return (${parentJsxElement.getText()})
            }`;

						const targetFile = file.replace(item.name, `${chunkName}`);
						const targetFilePath = path.join(
							REGISTRY_SOURCE_PATH,
							`${style.name}/${type}/${chunkName}.tsx`,
						);

						// Write component file.
						// rimraf.sync(targetFilePath);
						await fs.writeFile(targetFilePath, code, "utf8");

						return {
							name: chunkName,
							description,
							component: `React.lazy(() => import("#registry/${style.name}/${type}/${chunkName}")),`,
							file: targetFile,
							container: {
								className: containerClassName,
							},
						};
					}),
				);

				// // Write the source file for blocks only.
				sourceFilename = `__registry__/${style.name}/${type}/${item.name}.tsx`;

				if (item.files) {
					const files = item.files.map((file) =>
						typeof file === "string"
							? { type: "registry:page", path: file }
							: file,
					);
					if (files?.length) {
						sourceFilename = `__registry__/${style.name}/${files[0].path}`;
					}
				}

				const sourcePath = path.join(process.cwd(), sourceFilename);
				if (!existsSync(sourcePath)) {
					await fs.mkdir(sourcePath, { recursive: true });
				}

				// rimraf.sync(sourcePath);
				await fs.writeFile(sourcePath, sourceFile.getText());
			}

			let componentPath = `#registry/${style.name}/${type}/${item.name}`;

			if (item.files) {
				const files = item.files.map((file) =>
					typeof file === "string"
						? { type: "registry:page", path: file }
						: file,
				);
				if (files?.length) {
					componentPath = `#registry/${style.name}/${files[0].path}`;
				}
			}

			index += `
    "${item.name}": {
      name: "${item.name}",
      type: "${item.type}",
      registryDependencies: ${JSON.stringify(item.registryDependencies)},
      files: [${resolveFiles.map((file) => `"${file}"`)}],
      component: React.lazy(() => import("${componentPath}")),
      source: "${sourceFilename}",
      category: "${item.category}",
      subcategory: "${item.subcategory}",
      chunks: [${chunks.map(
				(chunk) => `{
        name: "${chunk.name}",
        description: "${chunk.description ?? "No description"}",
        component: ${chunk.component}
        file: "${chunk.file}",
        container: {
          className: "${chunk.container.className}"
        }
      }`,
			)}]
    },`;
		}

		index += `
  },`;
	}

	index += `
}
`;

	// ----------------------------------------------------------------------------
	// Build registry/index.json.
	// ----------------------------------------------------------------------------
	const items = registry
		.filter((item) => ["registry:ui"].includes(item.type))
		.map((item) => {
			return {
				...item,
				files: item.files?.map((_file) => {
					const file =
						typeof _file === "string"
							? {
									path: _file,
									type: item.type,
								}
							: _file;

					return file;
				}),
			};
		});
	const registryJson = JSON.stringify(items, null, 2);
	// rimraf.sync(path.join(REGISTRY_EXPORT_PATH, "index.json"));

	console.log("write json");
	await fs.writeFile(
		path.join(REGISTRY_EXPORT_PATH, "index.json"),
		registryJson,
		"utf8",
	);

	// Write style index.
	// rimraf.sync(path.join(process.cwd(), "__registry__/index.tsx"));
	await fs.writeFile(
		path.resolve(REGISTRY_EXPORT_ROOT, "__registry__/index.tsx"),
		index,
	);
}

try {
	const result = registrySchema.safeParse(registry);

	if (!result.success) {
		console.error(result.error);
		process.exit(1);
	}

	await buildRegistry(result.data);
	await buildStyles(result.data);
	await buildStylesIndex();
	// await buildThemes();

	console.log("✅ Done!");
} catch (error) {
	console.error(error);
	process.exit(1);
}
