// shadcn do not export as ESM the build command

import { type Project, ScriptKind, type SourceFile } from "ts-morph";

import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";

export const createTempSourceFile = async (filename: string) => {
	const dir = await mkdtempSync(join(tmpdir(), "shadcn-"));
	return join(dir, filename);
};

type Context = {
	sourceRootPath: string;
	registryUrl: string;
};

export const parseType = (folder?: string, input?: string) => {
	if (folder === "lib") {
		return {
			type: "registry:lib",
			ext: "ts",
		};
	} else if (folder === "hooks") {
		return {
			type: "registry:hook",
			ext: "ts",
		};
	}

	return {
		type: "registry:component",
		ext: "tsx",
	};
};

const matchPath = (pathInput: string) => {
	return pathInput.match(
		/([?:\.\/|#])*(components|lib|hooks)\/(shadcn\/)*(.*)$/,
	);
};

/**
 * derive registry name and names of files
 *
 * @param pathInput
 * @param context
 * @returns
 */
export const parseImportPath = (
	pathInput: string,
	context: Context & {
		filePath: string;
	},
) => {
	if (pathInput.startsWith("@geist")) {
		// internal package
		pathInput = pathInput.replace("@geist/domain", "#lib/domain");
	}

	const pathRootMatch = matchPath(pathInput);
	const { sourceRootPath, filePath, registryUrl } = context;

	let packageName;
	let registryPath = pathInput;
	let shadcnPackage;

	if (pathInput.startsWith("./")) {
		registryPath = join(dirname(filePath), pathInput);
	} else if (pathRootMatch?.[1] === "#") {
		registryPath = pathInput.replace("#", "registry/");
	} else {
		packageName = getPackageName(pathInput);
	}

	if (pathRootMatch?.[3]) {
		shadcnPackage = pathRootMatch[4];
	}

	if (pathRootMatch?.[0]) {
		registryPath = `registry/${pathRootMatch[2]}/${pathRootMatch[4]}`;
	}

	// re-match for relative path

	const { type, ext } = parseType(matchPath(registryPath)?.[2], pathInput);
	return { packageName, shadcnPackage, type, registryPath, ext };
};

export const getPackageName = (moduleSpecifier: string): string | null => {
	const parts = moduleSpecifier.split("/");

	if (moduleSpecifier.startsWith("@")) {
		return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : moduleSpecifier;
	}

	return `${parts[0]}`;
};

// normalize
export const createRegisterDependencyPath = (
	context: Context,
	name: string,
) => {
	return context.registryUrl + name + ".json";
};

export const parseComments = async (sourceFile: SourceFile) => {
	// use comments from default export
	const comments = sourceFile
		.getExportAssignments()?.[0]
		?.getLeadingCommentRanges();

	if (comments?.length > 0) {
		const comment = comments.pop();
		const commentBlock = comment?.getText() || "";

		// Extract from the comment block top of file
		const title = commentBlock.match(/@title:\s*(.*)/)?.[1];
		const description = commentBlock.match(/@description:\s*(.*)/)?.[1];

		return {
			title,
			description,
		};
	}
	return {};
};

export const parseItem = async (
	file: string,
	context: Context,
	project: Project,
) => {
	console.log("parseItem:", file);
	const { sourceRootPath, registryUrl } = context;

	const pathRootMatch = matchPath(file);
	const { type, ext } = parseType(pathRootMatch?.[2]);

	const registryItemMetadata = {
		title: "",
		description: "",
		target: "",
		dependencies: new Set(),
		registryDependencies: new Set(),
	} as any;

	const registryFilePath = relative(sourceRootPath, file);

	const name = registryFilePath
		.replace(/\.[^/.]+$/, "")
		.replace("registry/", "");

	const content = readFileSync(file, "utf-8");

	const sourceFile = project.createSourceFile(file, content, {
		scriptKind: ScriptKind.TSX,
		overwrite: true,
	});

	const { title, description = "" } = await parseComments(sourceFile);

	const files = [] as {
		path: string;
		type: string;
	}[];

	const registryPath = relative(sourceRootPath, file);

	files.push({
		path: registryPath,
		type,
	});

	for (const node of sourceFile.getImportDeclarations()) {
		const currentImport = node.getModuleSpecifier().getLiteralValue();
		const {
			packageName,
			registryPath,
			shadcnPackage,
			type: itemType,
			ext,
		} = parseImportPath(currentImport, {
			...context,
			filePath: registryFilePath,
		});

		if (shadcnPackage) {
			registryItemMetadata.registryDependencies.add(shadcnPackage);

			const suffix = currentImport.startsWith("#components") ? "ui/" : "/";
			const importPath = currentImport
				.replace("#", "@/")
				.replace("shadcn/", suffix);

			node.getModuleSpecifier().replaceWithText(`"${importPath}"`);
		} else if (packageName) {
			registryItemMetadata.dependencies.add(packageName);
		} else {
			// Note we workaround https://github.com/shadcn-ui/ui/issues/6678 by avoiding @/registry for non components
			const importPath =
				itemType === "registry:component"
					? registryPath.replace("registry/", "@/registry/")
					: registryPath.replace("registry/", "@/");

			console.log("import:", currentImport, "->", importPath);

			node.getModuleSpecifier().replaceWithText(`"${importPath}"`);
			files.push({
				path: registryPath + "." + ext,
				type: itemType,
			});
		}
	}

	registryItemMetadata.registryFilePath = registryFilePath;

	const registryItem = {
		title: title || name || "",
		description: description || "",
		author: "geist",
		name: `@geist/${name}`,
		type,
		files,
		registryDependencies: Array.from(registryItemMetadata.registryDependencies),
		dependencies: Array.from(registryItemMetadata.dependencies),
	};

	return { registryItem, sourceFile };
};
