import type { Meta, StoryObj } from "@storybook/react";

import { uploadFiles } from "@/lib/filecoin/lighthouse/browser";
import { withToaster } from "../decorators/toaster";
import UploadDropzone from "./UploadDropzone";
import { uploadSuccessToast } from "./upload-toast";

const meta = {
	title: "Filecoin/UploadDropzone",
	component: UploadDropzone,
	argTypes: {},
	args: {},

	decorators: [withToaster()],
} satisfies Meta<typeof UploadDropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

const LIGHTHOUSE_API_KEY = import.meta.env.VITE_LIGHTHOUSE_API_KEY!;
const AKAVE_ENDPOINT_URL = import.meta.env.VITE_AKAVE_ENDPOINT_URL!;

export const Lighthouse: Story = {
	args: {
		uploadFiles: async ({
			files,
		}: {
			files: File[];
		}) => {
			console.log("upload files with lighthouse", files);

			const results = await uploadFiles<false>({
				config: {
					accessToken: LIGHTHOUSE_API_KEY,
				},
				files,
			});
			const {
				data: { Name: name, Hash: cid },
			} = results;
			uploadSuccessToast({ cid, name });
			return cid;
		},
	},
};

export const LighthouseDirectory: Story = {
	args: {
		isAcceptDirectory: true,
		uploadFiles: async ({
			files,
		}: {
			files: File[];
		}) => {
			console.log("upload files with lighthouse", files);

			const results = await uploadFiles<false>({
				config: {
					accessToken: LIGHTHOUSE_API_KEY,
				},
				files,
			});
			const {
				data: { Name: name, Hash: cid },
			} = results;
			uploadSuccessToast({ cid, name });
			return cid;
		},
	},
};

export const StorachaDirectory: Story = {
	args: {
		isAcceptDirectory: true,
		uploadFiles: async ({
			files,
		}: {
			files: File[];
		}) => {
			console.log("upload files with storacha", files);
		},
	},
};

// export const Akave: Story = {
// 	args: {
// 		uploadFiles: async ({ files }: {
// 			files: File[];
// 		}) => {
// 			console.log('upload files with akave', files);
// 			// const response = await uploadFileLighthouse(file, LIGHTHOUSE_API_KEY!);

// 			const results = await uploadFiles<false>({
// 				config: {
// 					accessToken: LIGHTHOUSE_API_KEY,
// 				},
// 				files
// 			});
// 			console.log('results', results)
// 			const { data: { Name: name, Hash: cid } } = results;
// 			uploadSuccessToast({ cid, name });
// 			return cid;
// 		}
// 	},
// };
