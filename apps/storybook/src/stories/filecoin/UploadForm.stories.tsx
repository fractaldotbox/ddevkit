import type { Meta, StoryObj } from "@storybook/react";

import { uploadText } from "@/lib/filecoin/lighthouse/isomorphic";
import { FileParams, UploadForm } from "./UploadForm";

const meta = {
	title: "Filecoin/UploadForm",
	component: UploadForm,
	argTypes: {},
	args: {},
} satisfies Meta<typeof UploadForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const LIGHTHOUSE_API_KEY = import.meta.env.VITE_LIGHTHOUSE_API_KEY!;

export const TextLighthouse: Story = {
	args: {
		isText: true,
		uploadFile: async ({ file }: FileParams) => {
			console.log("uploadFile", file, LIGHTHOUSE_API_KEY);
			const response = await uploadText(file, LIGHTHOUSE_API_KEY!);
			console.log("response", response);
			const { cid } = response;

			return cid;
		},
	},
};

export const FileLighthouse: Story = {
	args: {
		isText: false,
		uploadFile: async ({ file }: FileParams) => {
			const response = await uploadText(file, LIGHTHOUSE_API_KEY!);
			console.log("response", response);
			const { cid } = response;

			return cid;
		},
	},
};
