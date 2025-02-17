import { describe, expect, it } from "vitest";
import { getPackageName, parseFilePath, parseImportPath } from "./parser";

describe("getPackageName", () => {
	it("returns package name for valid scoped module specifier", () => {
		// For example "@babel/core" should return "@babel/core"
		expect(getPackageName("@babel/core")).toBe("@babel/core");
	});

	it("returns package name for non-scoped ", () => {
		// For example "lodash" does not start with "@", so it should return null.
		expect(getPackageName("viem/ens")).toBe("viem");
	});

	it("returns correct package name when there are extra segments", () => {
		// Ensure it uses the first two segments only.
		expect(getPackageName("@scope/pkg/extra")).toBe("@scope/pkg");
	});
});

const context = {
	sourceRootPath: "src",
	registryUrl: "https://example.com/r/",
	filePath: "",
};

describe("parseFilePath", () => {
	it("returns default type and no match for a non-matching path", () => {
		const result = parseFilePath("./random/path", context);
		expect(result.type).toBe("registry:component");
		expect(result.pathRootMatch).toBeNull();
	});

	it("detects a components path", () => {
		const result = parseFilePath("components/shadcn/button", context);
		expect(result.type).toBe("registry:component");
		expect(result.pathRootMatch).toBeTruthy();
	});

	it("returns default type for lib path due to matching result", () => {
		const result = parseFilePath("lib/foo", context);
		// Despite intent to change type, matching returns full string
		expect(result.type).toBe("registry:component");
		expect(result.pathRootMatch?.[0]).toBe("lib/foo");
	});

	it("returns default type for hooks path due to matching result", () => {
		const result = parseFilePath("hooks/useSomething", context);
		expect(result.type).toBe("registry:component");
		expect(result.pathRootMatch?.[0]).toBe("hooks/useSomething");
	});
});

describe("parseImportPath", () => {
	it("returns parsed package from ESM", () => {
		const { packageName } = parseImportPath("@zod/a/b", context);
		expect(packageName).toBe("@zod/a");
	});
	it("returns lib for internal package", () => {
		const { packageName, registryPath } = parseImportPath(
			"@geist/domain/config",
			context,
		);
		expect(packageName).toBe(undefined);
		expect(registryPath).toBe("registry/lib/domain/config");
	});
	it("returns parsed package from ESM non namespace", () => {
		const { packageName } = parseImportPath("viem/ens", context);
		expect(packageName).toBe("viem");
	});
	it("returns registry path from relative", () => {
		const { packageName, registryPath } = parseImportPath("./c", {
			...context,
			// filePath not include src/
			filePath: "a/b/d.tsx",
		});
		expect(packageName).toBe(undefined);
		expect(registryPath).toBe("a/b/c");
	});

	it("returns registry dependency from shadcn components", () => {
		const { packageName, shadcnPackage, registryPath } = parseImportPath(
			"#components/shadcn/tooltip",
			{
				...context,
				filePath: "src/a/b/d.tsx",
			},
		);
		expect(packageName).toBe(undefined);
		expect(shadcnPackage).toBe("tooltip");
		expect(registryPath).toBe("registry/components/tooltip");
	});
	it("returns registry path from alias", () => {
		const { packageName, registryPath } = parseImportPath("#lib/d/c.ts", {
			...context,
			filePath: "src/a/b/d.tsx",
		});
		expect(packageName).toBe(undefined);
		expect(registryPath).toBe("registry/lib/d/c.ts");
	});
});
