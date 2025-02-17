/**
 * 1. Clone all packages into working area
 * 2. iterate codebase and pre-process, rewrite paths
 * 3. generate registry.json
 * 4. use shadcn build to build the registry
 *
 * Note: shadcn do not export as ESM the build Command
 */

import { execSync } from "node:child_process";
import { Project, ScriptKind, SyntaxKind } from "ts-morph";

import {
	cpSync,
	existsSync,
	mkdirSync,
	mkdtempSync,
	readFileSync,
	readdirSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path, { relative, join, basename, dirname, resolve } from "node:path";
import process from "node:process";
import { parseItem } from "./parser";

console.log("Building shadcn done");

console.log("rewrite paths");

const project = new Project({
	compilerOptions: {},
});

const createWorkingArea = async () => {
	const dest = await mkdtempSync(join(tmpdir(), "geist-registry-"));
	console.log("working area", dest);

	await cpSync(
		join(import.meta.dirname, "../../../packages/ui-react/src"),
		join(dest, "registry"),
		{ recursive: true },
	);

	await cpSync(
		join(import.meta.dirname, "../../../packages/domain/src"),
		join(dest, "registry/lib/domain"),
		{ recursive: true },
	);

	return dest;
};

const registryJsonPath = resolve(import.meta.dirname, "../registry.json");

console.log("creating working area");
const sourceRootPath = await createWorkingArea();

async function getFiles(dir: string): Promise<string[]> {
	let files: string[] = [];
	const entries = await readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			files = files.concat(await getFiles(fullPath));
		} else if (
			entry.isFile() &&
			(fullPath.endsWith(".ts") || fullPath.endsWith(".tsx")) &&
			!fullPath.match(".test.") &&
			!fullPath.match("shadcn/")
		) {
			files.push(fullPath);
		}
	}
	return files;
}

export const ensureDirectoriesExist = async (paths: string[]) => {
	const uniqueDirs = new Set(paths.map((path) => dirname(path)));

	await Promise.all(
		Array.from(uniqueDirs).map((dir) => mkdirSync(dir, { recursive: true })),
	);
};

const context = {
	sourceRootPath,
	registryLocalPath: join(import.meta.dirname, "../public/r"),
	registryUrl: process.env.REGISTRY_URL || "https://example.com/r/",
};

console.log("Build Context", context);

const files = await getFiles(context.sourceRootPath);

const registryPaths = files.map((file) =>
	join(
		context.registryLocalPath,
		relative(context.sourceRootPath, file).replace("registry/", ""),
	),
);

console.log("registryPaths", registryPaths);

const registryTree = {
	$schema: "https://ui.shadcn.com/schema/registry.json",
	name: "shadcn",
	homepage: "https://ui.shadcn.com",
	items: [],
};

for (const file of files) {
	const { registryItem, sourceFile } = await parseItem(file, context, project);
	registryTree.items.push(registryItem);
	await sourceFile.save();
}
writeFileSync(registryJsonPath, JSON.stringify(registryTree, null, 2));

// we create nested path for components by hacking `name` field, which shadcn wont pre-create the folders by default
console.log("pre-created registry folders");

await ensureDirectoriesExist(registryPaths);

console.log("Building shadcn");

const command = `
shadcn build -c ${context.sourceRootPath} ${registryJsonPath} -o ${context.registryLocalPath}
`;

await execSync(command, {
	// cwd: '',
	stdio: "inherit",
});
