import type { Meta, StoryObj } from "@storybook/react";

import config from "@geist/domain/config";
import UploadDropzone from "@geist/ui-react/components/filecoin/UploadDropzone";
import { uploadFiles } from "@geist/ui-react/lib/filecoin/lighthouse/browser";
import { withToaster } from "../decorators/toaster";

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
					accessToken: config.lighthouse.apiKey,
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
					accessToken: config.lighthouse.apiKey,
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
