import type { Meta, StoryObj } from "@storybook/react";

import UploadDropzone from "./UploadDropzone";
import {
	uploadFile as uploadFileLighthouse,
	uploadText,
} from "@/lib/filecoin/lighthouse/isomorphic";
import { createToast } from "./upload-toast";

const meta = {
	title: "Filecoin/UploadDropzone",
	component: UploadDropzone,
	argTypes: {},
	args: {},

} satisfies Meta<typeof UploadDropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

const LIGHTHOUSE_API_KEY = import.meta.env.VITE_LIGHTHOUSE_API_KEY!;
const AKAVE_ENDPOINT_URL = import.meta.env.VITE_AKAVE_ENDPOINT_URL!;



export const Lighthouse: Story = {
	args: {
		uploadFiles: async ({ files }: {
			files: File[];
		}) => {
			console.log('upload files with lighthouse', files);
			//TODO bulk
			const [file] = files;
			const response = await uploadFileLighthouse(file, LIGHTHOUSE_API_KEY!);
			const { name, cid } = response;
			createToast({ cid, name });
			return cid;
		}
	},
};
