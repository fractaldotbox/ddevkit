import type { Meta, StoryObj } from "@storybook/react";

import { uploadFileWithFormData } from "@/lib/filecoin/akave/client";
import {
	uploadFile as uploadFileLighthouse,
	uploadText,
} from "@/lib/filecoin/lighthouse/isomorphic";
import { withToaster } from "../decorators/toaster";
import { FileParams, UploadForm } from "./UploadForm";
import { createToast } from "./upload-toast";

import { IpfsGateway } from "@/lib/filecoin/gateway";
import { initStorachaClient } from "./use-storacha-client";

const meta = {
	title: "Filecoin/UploadForm",
	component: UploadForm,
	argTypes: {},
	args: {},
	decorators: [withToaster()],
} satisfies Meta<typeof UploadForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const LIGHTHOUSE_API_KEY = import.meta.env.VITE_LIGHTHOUSE_API_KEY!;
const AKAVE_ENDPOINT_URL = import.meta.env.VITE_AKAVE_ENDPOINT_URL!;

const STORACHA_KEY = import.meta.env.VITE_STORACHA_KEY!;
const STORACHA_PROOF = import.meta.env.VITE_STORACHA_PROOF!;

const mapTextAsBlob = (text: string) => {
	return new Blob([text], { type: "text/plain" });
};

export const TextLighthouse: Story = {
	args: {
		isText: true,
		uploadFile: async ({
			file,
			uploadProgressCallback,
		}: FileParams<string>) => {
			const response = await uploadText(file, LIGHTHOUSE_API_KEY!);
			const { name, cid, size } = response;
			if (uploadProgressCallback) {
				uploadProgressCallback({
					transferredBytes: size,
					totalBytes: size,
					percent: 1,
				});
			}
			createToast({ cid, name, gateway: IpfsGateway.Lighthouse });
			return cid;
		},
	},
};

export const TextAkave: Story = {
	args: {
		isText: true,
		uploadFile: async ({ file }: FileParams<string>) => {
			// Accept File not blob
			const response = await uploadFileWithFormData({
				akaveEndpointUrl: AKAVE_ENDPOINT_URL,
				bucketName: "test-bucket",
				fileName: "test.txt",
				file: new File([file], "test.txt"),
			});
			const { Name: name, RootCID: cid } = response;

			createToast({ cid, name, gateway: IpfsGateway.Lighthouse });
			return cid;
		},
	},
};

export const FileLighthouse: Story = {
	args: {
		isText: false,
		uploadFile: async ({ file, uploadProgressCallback }: FileParams<File>) => {
			const response = await uploadFileLighthouse(
				file,
				LIGHTHOUSE_API_KEY!,
				uploadProgressCallback,
			);
			const { name, cid } = response;
			createToast({ cid, name });
			return cid;
		},
	},
};

export const TextStoracha: Story = {
	args: {
		isText: true,
		uploadFile: async ({
			file,
			uploadProgressCallback,
		}: FileParams<string>) => {
			const blob = mapTextAsBlob(file);
			const { client, uploadFile } = await initStorachaClient({
				keyString: STORACHA_KEY,
				proofString: STORACHA_PROOF!,
			});

			const link = await uploadFile({ file: blob, uploadProgressCallback });

			createToast({ cid: link.toString(), name: "" });
		},
	},
};

export const FileStoracha: Story = {
	args: {
		isText: false,
		uploadFile: async ({ file, uploadProgressCallback }: FileParams<File>) => {
			const { uploadFile } = await initStorachaClient({
				keyString: STORACHA_KEY,
				proofString: STORACHA_PROOF!,
			});

			const link = await uploadFile({ file, uploadProgressCallback });

			createToast({ cid: link.toString(), name: "" });
		},
	},
};

export const FileAkave: Story = {
	args: {
		isText: false,
		isShowProgress: false,
		uploadFile: async ({ file, uploadProgressCallback }: FileParams<File>) => {
			const response = await uploadFileWithFormData({
				akaveEndpointUrl: AKAVE_ENDPOINT_URL,
				bucketName: "test-bucket",
				fileName: "test.txt",
				file,
				uploadProgressCallback,
			});
			const { Name: name, RootCID: cid } = response;

			createToast({ cid, name });
			return cid;
		},
	},
};
