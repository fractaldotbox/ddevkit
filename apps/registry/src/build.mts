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
	rmSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path, {
	relative,
	join,
	basename,
	dirname,
	resolve,
	matchesGlob,
} from "node:path";
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

	await rmSync(join(dest, "registry/index.ts"));

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
			matchesGlob(fullPath, "**/*.{ts,tsx}") &&
			!matchesGlob(fullPath, "**/*.{test,fixture}.*") &&
			!matchesGlob(fullPath, "**/shadcn/*")
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
	name: "geist-ddev-kit",
	homepage: "https://ddevkit.geist.network",
	items: [],
};

const itemByName = new Map();

for (const file of files) {
	const { registryItem, geistDependencies, sourceFile } = await parseItem(
		file,
		context,
		project,
	);
	registryTree.items.push(registryItem);
	itemByName.set(registryItem.name, { registryItem, geistDependencies });
	await sourceFile.save();
}

// quick workaround to do 1 level transitive deps, we should eval deps tree

for (const [
	name,
	{ registryItem, geistDependencies },
] of itemByName.entries()) {
	for (const dep of geistDependencies) {
		const depItem = itemByName.get(dep);
		if (depItem) {
			for (const dep of depItem.registryItem.registryDependencies) {
				registryItem.registryDependencies.push(dep);
			}
		}
	}
}

// handle transitive registry deps

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
