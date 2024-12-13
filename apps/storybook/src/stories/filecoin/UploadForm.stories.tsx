import type { Meta, StoryObj } from "@storybook/react";

import { uploadFileWithFormData } from "@/lib/filecoin/akave/client";
import {
	uploadFiles as uploadFilesLighthouse,
	uploadText,
} from "@/lib/filecoin/lighthouse/isomorphic";

import {
	initStorachaClient,
	uploadFiles as uploadFilesStoracha,
} from "@/lib/filecoin/storacha/isomorphic";

import { withToaster } from "../decorators/toaster";
import { UploadFilesParams, UploadForm, UploadFormType } from "./UploadForm";
import { uploadSuccessToast } from "./upload-toast";

import { IpfsGateway } from "@/lib/filecoin/gateway";
import { FileLike } from "@web3-storage/w3up-client/types";

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

export const LighthouseText: Story = {
	args: {
		type: UploadFormType.Text,
		uploadFiles: async ({
			file,
			uploadProgressCallback,
		}: UploadFilesParams<{ file: string }>) => {
			const response = await uploadText(file, LIGHTHOUSE_API_KEY!);
			const { name, cid, size } = response;
			if (uploadProgressCallback) {
				uploadProgressCallback({
					transferredBytes: size,
					totalBytes: size,
					percent: 1,
				});
			}
			uploadSuccessToast({ cid, name, gateway: IpfsGateway.Lighthouse });
			return cid;
		},
	},
};

export const LighthouseFile: Story = {
	args: {
		type: UploadFormType.File,
		uploadFiles: async ({
			file,
			uploadProgressCallback,
		}: UploadFilesParams<{ file: File }>) => {
			const response = await uploadFilesLighthouse(
				[file],
				LIGHTHOUSE_API_KEY!,
				uploadProgressCallback,
			);
			const { name, cid } = response;
			uploadSuccessToast({ cid, name });
			return cid;
		},
	},
};

export const LighthouseDirectory: Story = {
	args: {
		...LighthouseFile.args,
		type: UploadFormType.FileDirectory,
	},
};

export const LighthouseMultipleFiles: Story = {
	args: {
		type: UploadFormType.FileMultiple,
		isMultipleFiles: true,
		uploadFiles: async ({
			file,
			uploadProgressCallback,
		}: UploadFilesParams<{ file: File[] }>) => {
			console.log("upload DirectoryLighthouse", file);
			const response = await uploadFilesLighthouse(
				file,
				LIGHTHOUSE_API_KEY!,
				uploadProgressCallback,
			);
			const { name, cid } = response;
			uploadSuccessToast({ cid, name });
			return cid;
		},
	},
};

export const StorachaText: Story = {
	args: {
		type: UploadFormType.Text,
		uploadFiles: async ({
			file,
			uploadProgressCallback,
		}: UploadFilesParams<{ file: string }>) => {
			const blob = mapTextAsBlob(file);
			const { client, space } = await initStorachaClient({
				keyString: STORACHA_KEY,
				proofString: STORACHA_PROOF!,
			});

			const link = await uploadFilesStoracha(
				{ client, spaceDid: space.did() },
				{ files: [blob], uploadProgressCallback },
			);

			uploadSuccessToast({ cid: link.toString(), name: "" });
		},
	},
};

export const StorachaFile: Story = {
	args: {
		type: UploadFormType.File,
		uploadFiles: async ({
			file,
			uploadProgressCallback,
		}: UploadFilesParams<{ file: FileLike }>) => {
			const { client, space } = await initStorachaClient({
				keyString: STORACHA_KEY,
				proofString: STORACHA_PROOF!,
			});

			const link = await uploadFilesStoracha(
				{ client, spaceDid: space.did() },
				{ files: [file], uploadProgressCallback },
			);

			uploadSuccessToast({ cid: link.toString(), name: "" });
		},
	},
};

export const StorachaMultifield: Story = {
	args: {
		type: UploadFormType.MultifieldsAsDirectory,
		uploadFiles: async ({
			file,
			content,
			uploadProgressCallback,
		}: UploadFilesParams<any>) => {
			const { client, space } = await initStorachaClient({
				keyString: STORACHA_KEY,
				proofString: STORACHA_PROOF!,
			});

			const contentFile = new File([content], "content.md", {
				type: "text/plain",
			});

			const files = [file, contentFile];

			const link = await uploadFilesStoracha(
				{ client, spaceDid: space.did() },
				{ files, uploadProgressCallback },
			);

			uploadSuccessToast({ cid: link.toString(), name: "" });
		},
	},
};

export const AkaveText: Story = {
	args: {
		type: UploadFormType.Text,
		uploadFiles: async ({ file }: UploadFilesParams<{ file: string }>) => {
			// Accept File not blob
			const response = await uploadFileWithFormData({
				akaveEndpointUrl: AKAVE_ENDPOINT_URL,
				bucketName: "test-bucket",
				fileName: "test.txt",
				file: new File([file], "test.txt"),
			});
			const { Name: name, RootCID: cid } = response;

			uploadSuccessToast({ cid, name, gateway: IpfsGateway.Lighthouse });
			return cid;
		},
	},
};

export const AkaveFile: Story = {
	args: {
		type: UploadFormType.Text,
		isShowProgress: false,
		uploadFiles: async ({
			file,
			uploadProgressCallback,
		}: UploadFilesParams<{ file: File }>) => {
			const response = await uploadFileWithFormData({
				akaveEndpointUrl: AKAVE_ENDPOINT_URL,
				bucketName: "test-bucket",
				fileName: "test.txt",
				file,
				uploadProgressCallback,
			});
			const { Name: name, RootCID: cid } = response;

			uploadSuccessToast({ cid, name });
			return cid;
		},
	},
};
