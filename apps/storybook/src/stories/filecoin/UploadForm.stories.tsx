import type { Meta, StoryObj } from "@storybook/react";

import { uploadFileWithFormData } from "@/lib/filecoin/akave/client";
import {
	uploadFile as uploadFileLighthouse,
	uploadText,
} from "@/lib/filecoin/lighthouse/isomorphic";

import {
	initStorachaClient,
	uploadFiles as uploadFilesStoracha,
} from "@/lib/filecoin/storacha/isomorphic";

import { withToaster } from "../decorators/toaster";
import { UploadFileParams, UploadForm, UploadFormType } from "./UploadForm";
import { createToast } from "./upload-toast";

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

export const TextLighthouse: Story = {
	args: {
		type: UploadFormType.Text,
		uploadFile: async ({
			file,
			uploadProgressCallback,
		}: UploadFileParams<{ file: string }>) => {
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
		type: UploadFormType.Text,
		uploadFile: async ({ file }: UploadFileParams<{ file: string }>) => {
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
		type: UploadFormType.File,
		uploadFile: async ({
			file,
			uploadProgressCallback,
		}: UploadFileParams<{ file: File }>) => {
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
		type: UploadFormType.Text,
		uploadFile: async ({
			file,
			uploadProgressCallback,
		}: UploadFileParams<{ file: string }>) => {
			const blob = mapTextAsBlob(file);
			const { client, space } = await initStorachaClient({
				keyString: STORACHA_KEY,
				proofString: STORACHA_PROOF!,
			});

			const link = await uploadFilesStoracha(
				{ client, spaceDid: space.did() },
				{ files: [blob], uploadProgressCallback },
			);

			createToast({ cid: link.toString(), name: "" });
		},
	},
};

export const FileStoracha: Story = {
	args: {
		type: UploadFormType.File,
		uploadFile: async ({
			file,
			uploadProgressCallback,
		}: UploadFileParams<{ file: FileLike }>) => {
			const { client, space } = await initStorachaClient({
				keyString: STORACHA_KEY,
				proofString: STORACHA_PROOF!,
			});

			const link = await uploadFilesStoracha(
				{ client, spaceDid: space.did() },
				{ files: [file], uploadProgressCallback },
			);

			createToast({ cid: link.toString(), name: "" });
		},
	},
};

export const MultifieldStoracha: Story = {
	args: {
		type: UploadFormType.MultifieldsAsDirectory,
		uploadFile: async ({
			file,
			content,
			uploadProgressCallback,
		}: UploadFileParams<any>) => {
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

			createToast({ cid: link.toString(), name: "" });
		},
	},
};

export const FileAkave: Story = {
	args: {
		type: UploadFormType.Text,
		isShowProgress: false,
		uploadFile: async ({
			file,
			uploadProgressCallback,
		}: UploadFileParams<{ file: File }>) => {
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
