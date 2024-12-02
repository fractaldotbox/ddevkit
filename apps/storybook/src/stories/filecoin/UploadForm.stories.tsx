import type { Meta, StoryObj } from "@storybook/react";

import {
	uploadFileObject,
	uploadFileWithFormData,
} from "@/lib/filecoin/akave/client";
import {
	uploadFile as uploadFileLighthouse,
	uploadText,
} from "@/lib/filecoin/lighthouse/isomorphic";
import { withToaster } from "../decorators/toaster";
import { FileParams, UploadForm } from "./UploadForm";
import { createToast } from "./upload-toast";

import { createClient } from "@/lib/filecoin/storacha/isomorphic";
import { StoreMemory } from "@web3-storage/w3up-client/stores/memory";

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

export const TextLighthouse: Story = {
	args: {
		isText: true,
		uploadFile: async ({ file }: FileParams) => {
			const response = await uploadText(file, LIGHTHOUSE_API_KEY!);
			const { name, cid } = response;
			createToast({ cid, name });
			return cid;
		},
	},
};

export const TextAkave: Story = {
	args: {
		isText: true,
		uploadFile: async ({ file }: FileParams) => {
			const response = await uploadFileObject({
				akaveEndpointUrl: AKAVE_ENDPOINT_URL,
				bucketName: "test-bucket",
				fileName: "test.txt",
				file,
			});
			const { Name: name, RootCID: cid } = response;

			createToast({ cid, name });
			return cid;
		},
	},
};

export const FileLighthouse: Story = {
	args: {
		isText: false,
		uploadFile: async ({ file }: FileParams) => {
			const response = await uploadFileLighthouse(file, LIGHTHOUSE_API_KEY!);
			const { name, cid } = response;
			createToast({ cid, name });
			return cid;
		},
	},
};

export const FileStoracha: Story = {
	args: {
		isText: false,
		uploadFile: async ({ file }: FileParams) => {
			const client = await createClient();

			// TODO use pre-created
			const space = await client.createSpace("temp");

			// not intuitive that the created space can't be use, setCurrentSpace results in "no proofs"
			// need to provide account

			const file2 = new File(["content"], "test.txt", { type: "text/plain" });

			// * The issuer needs the `blob/add`, `index/add`, `filecoin/offer` and
			// * `upload/add` delegated capability.
			const auth = await space.createAuthorization(client, {
				// access: {
				// 	'index/add': true,
				// 	'blob/add': true,
				// 	'filecoin/offer': true,
				// }
			});
			// auth.proofs?.[0].
			await client.addSpace(auth);
			// await client.addSpace(space);
			await client.setCurrentSpace(space.did());

			console.log("spaces ", client.spaces());

			const blob = new Blob(
				[
					JSON.stringify({
						abc: 123,
					}),
				],
				{ type: "application/json" },
			);
			const link = await client.uploadFile(new File([blob], "order.json"));
			// space.proo

			// Error: Agent has no proofs for

			// uploadFile only support
			// const results = await client.uploadDirectory([file2]);

			// failed space/blob/add invocation

			// console.log('client', results)
		},
	},
};

export const FileAkave: Story = {
	args: {
		isText: false,
		uploadFile: async ({ file }: FileParams) => {
			const response = await uploadFileWithFormData({
				akaveEndpointUrl: AKAVE_ENDPOINT_URL,
				bucketName: "test-bucket",
				fileName: "test.txt",
				file,
			});
			const { Name: name, RootCID: cid } = response;

			createToast({ cid, name });
			return cid;
		},
	},
};
