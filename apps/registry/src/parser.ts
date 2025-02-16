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

/**
 * derive registry name and names of files
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
	const pathRootMatch = pathInput.match(
		/^([?:\.\/|#])*(components|lib|hooks)\/(shadcn\/)*(.*)$/,
	);
	const { sourceRootPath, filePath, registryUrl } = context;

	let packageName;
	let type = "registry:block";
	if (pathRootMatch?.[0] === "lib") {
		type = "registry:lib";
	} else if (pathRootMatch?.[0] === "hooks") {
		type = "registry:hook";
	}

	console.log("parseImportPath", filePath, dirname(filePath), pathInput);
	// TODO bulk regex

	let registryPath = pathInput;
	let shadcnPackage;
	if (pathInput.startsWith("./")) {
		// TODO confirm extension
		console.log("rewrite relative", join(dirname(filePath), pathInput));
		registryPath = join(dirname(filePath), pathInput) + ".tsx";
	} else if (pathRootMatch?.[1] === "#") {
		// rewrite
	} else {
		packageName = getPackageName(pathInput);
	}

	const alias = pathRootMatch?.[1] === "#" ? "@/" : "";

	if (pathRootMatch?.[3]) {
		shadcnPackage = pathRootMatch[4];
	}

	// TODO rename not necessary for own registry
	// const modulePath =
	// 	pathRootMatch?.[2] === "components" ? "components/ui" : pathRootMatch?.[2];

	if (pathRootMatch?.[0]) {
		registryPath = `${alias}${pathRootMatch[2]}/${pathRootMatch[4]}`;
	}
	return { packageName, shadcnPackage, type, registryPath };
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

export const parseItem = async (
	file: string,
	context: Context,
	project: Project,
) => {
	const { sourceRootPath, registryUrl } = context;

	const registryItemMetadata = {
		title: "",
		description: "",
		target: "",
		dependencies: [],
		registryDependencies: [],
	} as any;

	const fileName = basename(file);
	console.log("sourceRootPath", sourceRootPath, file);
	const registryFilePath = relative(sourceRootPath, file);
	// const { type } = parseFilePath(registryFilePath, context);

	const type = "registry:block";
	const content = readFileSync(file, "utf-8");

	console.log("relativeFilePath", registryFilePath);

	const tempFile = await createTempSourceFile(fileName);

	const sourceFile = project.createSourceFile(tempFile, content, {
		scriptKind: ScriptKind.TSX,
	});

	const comments = sourceFile
		.getStatementsWithComments()[0]
		.getLeadingCommentRanges();

	const files = [];
	// TODO parse comments for title and description

	//  Replace shadcn imports
	for (const node of sourceFile.getImportDeclarations()) {
		// console.log("node", node);
		const currentImport = node.getModuleSpecifier().getLiteralValue();

		const {
			packageName,
			registryPath,
			shadcnPackage,
			type: itemType,
		} = parseImportPath(currentImport, {
			...context,
			filePath: registryFilePath,
		});

		console.log("import", currentImport, context, registryPath);

		if (shadcnPackage) {
			registryItemMetadata.registryDependencies.push(shadcnPackage);
		} else if (packageName) {
			registryItemMetadata.dependencies.push(packageName);
		} else {
			console.log("add files", registryPath);
			files.push({
				path: registryPath,
				type: itemType,
			});
		}

		// rewrite import path inside content

		// 		node.getModuleSpecifier().replaceWithText(`"${geistDependencyPath}"`);
	}

	let geistDependencyPath = parseImportPath(registryFilePath, {
		...context,
		filePath: registryFilePath,
	});

	// registryItem.content = sourceFile.getText();
	registryItemMetadata.registryFilePath = registryFilePath;
	registryItemMetadata.path = geistDependencyPath;

	const {
		title,
		description,
		registryDependencies,
		dependencies,
		path,
		// registryFilePath,
	} = registryItemMetadata;

	const name = registryFilePath.replace(/\.[^/.]+$/, "");

	// TODO use class name of default export as name
	const registryItem = {
		title: name,
		description,
		author: "geist",
		name,
		type,
		files,

		registryDependencies,
		dependencies,
	};

	return registryItem;
};
