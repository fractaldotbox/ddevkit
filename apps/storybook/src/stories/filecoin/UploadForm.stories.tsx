import type { Meta, StoryObj } from "@storybook/react";

import { uploadFileWithFormData } from "@geist/ui-react/lib/filecoin/akave/client";
import {
	uploadFiles as uploadFilesLighthouse,
	uploadText,
} from "@geist/ui-react/lib/filecoin/lighthouse/isomorphic";

import {
	initStorachaClient,
	uploadFiles as uploadFilesStoracha,
} from "@geist/ui-react/lib/filecoin/storacha/isomorphic";

import { withToaster } from "../decorators/toaster";
import { UploadFilesParams, UploadForm, UploadFormType } from "./UploadForm";
import { uploadSuccessToast } from "./upload-toast";

import config from "@geist/domain/config";
import { IpfsGateway } from "@geist/ui-react/lib/filecoin/gateway";
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
			const response = await uploadText(file, config.lighthouse.apiKey!);
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
				config.lighthouse.apiKey!,
				uploadProgressCallback,
			);
			const { name, cid } = response;
			uploadSuccessToast({ cid, name });
			return cid;
		},
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
			const response = await uploadFilesLighthouse(
				file,
				config.lighthouse.apiKey!,
				uploadProgressCallback,
			);
			const name = Array.from(file)
				.map((f) => f.name)
				.join(", ");

			const { cid } = response;
			uploadSuccessToast({ cid, name });
			return cid;
		},
	},
};

export const LighthouseDirectory: Story = {
	args: {
		...LighthouseMultipleFiles.args,
		type: UploadFormType.FileDirectory,
		isMultipleFiles: true,
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
				keyString: config.storacha.key!,
				proofString: config.storacha.proof!,
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
				keyString: config.storacha.key!,
				proofString: config.storacha.proof!,
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
				keyString: config.storacha.key!,
				proofString: config.storacha.proof!,
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
				akaveEndpointUrl: config.akave.endpointUrl!,
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
				akaveEndpointUrl: config.akave.endpointUrl!,
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
