import { describe, expect, test } from "vitest";

export const createFileForm = (files: File[], isDirectory = false) => {
	// Create a form element
	const form = document.createElement("form");
	const fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.name = isDirectory ? "directory" : "file";
	if (isDirectory) {
		fileInput.webkitdirectory = true; // Enable directory upload
	}
	form.appendChild(fileInput);

	// Simulate a file upload
	const dataTransfer = new DataTransfer();
	files.forEach((file) => {
		dataTransfer.items.add(file);
	});
	fileInput.files = dataTransfer.files;

	return {
		form,
		input: fileInput,
	};
};

describe(
	"lighthouse browser",
	() => {
		// @vitest-environment happy-dom

		function promisifyEvent(
			target: EventTarget,
			event: string,
		): Promise<Event> {
			return new Promise((resolve) => {
				const handler = (e: Event) => {
					target.removeEventListener(event, handler);
					resolve(e);
				};
				target.addEventListener(event, handler);
			});
		}

		test("should upload a file using a form", async () => {
			const file = new File(["content"], "test.txt", { type: "text/plain" });
			const { form, input } = createFileForm([file]);

			// Verify the file upload
			expect(input.files).not.toBeNull();
			expect(input.files!.length).toBe(1);
			expect(input.files![0].name).toBe("test.txt");
			expect(input.files![0].type).toBe("text/plain");

			// Simulate form submission

			const submitPromise = promisifyEvent(form, "submit");
			form.addEventListener("submit", (event) => {
				event.preventDefault();
				const formData = new FormData(form);
				const uploadedFile = formData.get("file") as File;

				// Verify the submitted file
				expect(uploadedFile).not.toBeNull();
				expect(uploadedFile.name).toBe("test.txt");
				expect(uploadedFile.type).toBe("text/plain");
			});

			// Create and dispatch a submit event
			const submitEvent = new Event("submit", {
				bubbles: true,
				cancelable: true,
			});
			form.dispatchEvent(submitEvent);
			await submitPromise;
		});

		test("should upload a directory using a form", async () => {
			const file1 = new File(["content1"], "directory/file1.txt", {
				type: "text/plain",
			});
			const file2 = new File(["content2"], "directory/file2.txt", {
				type: "text/plain",
			});
			const { form, input } = createFileForm([file1, file2], true);

			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file1);
			dataTransfer.items.add(file2);
			input.files = dataTransfer.files;

			// Verify the directory upload
			expect(input.files).not.toBeNull();
			expect(input.files!.length).toBe(2);
			expect(input.files![0].name).toBe("directory:file1.txt");
			expect(input.files![0].type).toBe("text/plain");
			expect(input.files![1].name).toBe("directory:file2.txt");
			expect(input.files![1].type).toBe("text/plain");

			const submitPromise = promisifyEvent(form, "submit");
			form.addEventListener("submit", (event) => {
				event.preventDefault();
				const formData = new FormData(form);
				const uploadedFiles = formData.getAll("directory") as File[];

				// Verify the submitted files
				expect(uploadedFiles).not.toBeNull();
				expect(uploadedFiles.length).toBe(2);
				expect(uploadedFiles[0].name).toBe("directory:file1.txt");
				expect(uploadedFiles[0].type).toBe("text/plain");
				expect(uploadedFiles[1].name).toBe("directory:file2.txt");
				expect(uploadedFiles[1].type).toBe("text/plain");
			});
			// Create and dispatch a submit event
			const submitEvent = new Event("submit", {
				bubbles: true,
				cancelable: true,
			});
			form.dispatchEvent(submitEvent);

			await submitPromise;
		});
	},
	60 * 1000,
);
