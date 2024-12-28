import { z } from "zod";

// function to get JSON from attestation (we cannot dynamically create zod schemas)
export const getZodSchemaFromSchemaString = (schemaString: string) => {
	const stringPairs = schemaString.split(",");
	const entries = stringPairs.map((pair) => pair.split(" "));
	const zodSchemaObject: any = {};

	for (const entry of entries) {
		const [type = "", name = ""] = entry;

		// process the type
		let zodSchemaType: any = z.string();
		if (type === "bool") {
			zodSchemaType = z.boolean();
		} else if (type.includes("uint")) {
			zodSchemaType = z.number();
		}

		// if we see array, we define as array schema
		if (type.includes("[]")) {
			zodSchemaType = zodSchemaType.array();
			console.log("array attached");
		}

		// attach to object
		zodSchemaObject[name] = zodSchemaType;
	}

	return z.object(zodSchemaObject);
};
