// shadcn do not export as ESM the build command

import { execSync } from "node:child_process";
import { type Project, ScriptKind, SyntaxKind } from "ts-morph";

import {
	existsSync,
	mkdtempSync,
	readFileSync,
	readdirSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";

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
 * TODO Imports should always use the @/registry path
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

	console.log("parseImportPath", filePath, dirname(filePath), pathInput);

	let registryPath = pathInput;
	let shadcnPackage;

	if (pathInput.startsWith("./")) {
		// TODO confirm extension
		console.log(
			"rewrite relative",
			pathInput,
			join(dirname(filePath), pathInput),
		);
		registryPath = join(dirname(filePath), pathInput);
	} else if (pathRootMatch?.[1] === "#") {
		// rewrite
		registryPath = pathInput.replace("#", "registry/");

		console.log("rewrite alias", pathInput.replace("#", ""), registryPath);
	} else {
		packageName = getPackageName(pathInput);
		console.log("packageName", packageName, pathInput);
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

export const parseFilePath = (pathInput: string, context: Context) => {
	let type = "registry:component";

	const pathRootMatch = pathInput.match(
		/(components|lib|hooks)\/(shadcn\/)*(.*)$/,
	);

	if (pathInput.startsWith("./")) {
		const resolved = relative(context.sourceRootPath, pathInput);

		// path input is re that file, use file path as input

		console.log("relative", pathInput, context.sourceRootPath, resolved);
	}

	if (pathRootMatch?.[0] === "lib") {
		type = "registry:lib";
	} else if (pathRootMatch?.[0] === "hooks") {
		type = "registry:hook";
	}
	return {
		type,
		pathRootMatch,
	};
};

// normalize
export const createRegisterDependencyPath = (
	context: Context,
	name: string,
) => {
	return context.registryUrl + name + ".json";
};

// Decouple parse/transform to be working-area independent and easier testing

export const parseItem = async (
	file: string,
	context: Context,
	project: Project,
) => {
	const { sourceRootPath, registryUrl } = context;

	console.log("parseItem:", file);

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

	const content = readFileSync(file, "utf-8");

	console.log("relativeFilePath", registryFilePath);

	const sourceFile = project.createSourceFile(file, content, {
		scriptKind: ScriptKind.TSX,
		overwrite: true,
	});

	// TODO parse comments for title and description
	// const comments = sourceFile
	// 	.getStatementsWithComments()[0]
	// 	// .getLeadingCommentRanges();

	const files = [];

	const registryPath = relative(sourceRootPath, file);

	// TODO path
	files.push({
		path: registryPath,
		type,
	});

	//  Replace shadcn imports
	for (const node of sourceFile.getImportDeclarations()) {
		const currentImport = node.getModuleSpecifier().getLiteralValue();
		// include self??
		console.log("currentImport:", currentImport);
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
			console.log("add: ", file);
			files.push({
				path: registryPath + "." + ext,
				type: itemType,
			});
		}

		// rewrite import path inside content
	}

	registryItemMetadata.registryFilePath = registryFilePath;

	const {
		title,
		description,
		path,
		// registryFilePath,
	} = registryItemMetadata;

	const name = registryFilePath
		.replace(/\.[^/.]+$/, "")
		.replace("registry/", "");

	console.log("files:", files);
	// TODO use class name of default export as name
	const registryItem = {
		title: name,
		description,
		author: "geist",
		name,
		type,
		files,
		registryDependencies: Array.from(registryItemMetadata.registryDependencies),
		dependencies: Array.from(registryItemMetadata.dependencies),
	};

	return { registryItem, sourceFile };
};
