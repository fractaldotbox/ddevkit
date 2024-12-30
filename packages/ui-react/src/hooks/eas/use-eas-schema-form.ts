import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
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

// do we want to make it safe?
export function useEasSchemaForm({
	schemaString,
	schemaId,
	isEnabled = true, // whether to use this hook or not
}: {
	schemaString?: string;
	schemaId?: string;
	isEnabled?: boolean;
}) {
	if (!schemaString && !schemaId)
		throw new Error(
			"[useEasSchemaForm] at least one of schemaString and schemaId must be present",
		);

	const [schemaStringState, setSchemaStringState] = useState(schemaString);

	const formSchema = useMemo(() => {
		if (!!schemaStringState)
			return getZodSchemaFromSchemaString(schemaStringState);
		return z.object({});
	}, [schemaString]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		disabled: !isEnabled,
	});

	// we return a react hook form instance
	return form;
}
