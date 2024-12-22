import { faker } from "@faker-js/faker";

import fs from "fs";
import os from "os";
import path from "path";

export const createTestFile = (testContent: string) => {
	const tmpDir = os.tmpdir();
	const fileName = "test.txt";
	const filePath = path.join(tmpDir, fileName);

	fs.writeFileSync(filePath, testContent, {
		encoding: "utf8",
	});

	const file = new File([testContent], fileName, {
		type: "text/plain",
	});

	return {
		file,
		fileName,
		filePath,
	};
};

export const createTestContent = () => {
	return faker.lorem.paragraphs(10);
};
