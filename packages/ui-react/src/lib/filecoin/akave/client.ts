import ky, { type DownloadProgress } from "ky";

export interface AkaveFile {
	Name: string;
	RootCID: string;
	Size: string;
	CreatedAt: string;
}

export interface AkaveBucket {
	ID: string;
	Name: string;
	CreatedAt: string;
	files: File[];
}

/**
 * Authentication and browser-compatability are to be confirmed
 * TODO refactor akave config object
 */

const AKAVE_ENDPOINT_URL = "localhost:3000";

export const getBucketMetadata = ({
	akaveEndpointUrl = AKAVE_ENDPOINT_URL,
	bucketName,
}: {
	akaveEndpointUrl: string;
	bucketName: string;
}) => {
	const url = `${akaveEndpointUrl}/buckets/${bucketName}`;

	return ky(url).then((response) => response.json());
};

export const listBucketFiles = ({
	akaveEndpointUrl = AKAVE_ENDPOINT_URL,
	bucketName,
}: {
	akaveEndpointUrl: string;
	bucketName: string;
}): Promise<AkaveFile[]> => {
	const url = `${akaveEndpointUrl}/buckets/${bucketName}/files`;

	return ky(url)
		.then((response) => response.json<{ data: AkaveFile[] }>())
		.then(({ data }) => {
			return data || [];
		});
};

type ListBucketRes = {
	data?: Omit<AkaveBucket, "files">[];
	success: boolean;
};
export const listBuckets = ({
	akaveEndpointUrl = AKAVE_ENDPOINT_URL,
}: {
	akaveEndpointUrl: string;
}) => {
	const url = `${akaveEndpointUrl}/buckets`;

	return ky(url).then((response) => response.json<ListBucketRes>());
};

type CreateBucketRes = {
	data?: {
		ID: string;
		transactionHash: string;
	};
	success: boolean;
};

export const createBucket = ({
	akaveEndpointUrl = AKAVE_ENDPOINT_URL,
	bucketName,
}: {
	akaveEndpointUrl: string;
	bucketName: string;
}) => {
	const url = `${akaveEndpointUrl}/buckets`;

	return ky
		.post(url, {
			json: { bucketName },
		})
		.then((response) => response.json<CreateBucketRes>());
};

export const createDownloadUrl = ({
	akaveEndpointUrl = AKAVE_ENDPOINT_URL,
	bucketName,
	fileName,
}: {
	akaveEndpointUrl: string;
	bucketName: string;
	fileName: string;
}) => {
	return `${akaveEndpointUrl}/buckets/${bucketName}/files/${fileName}/download`;
};

export type UploadParams = {
	akaveEndpointUrl: string;
	bucketName: string;
	fileName: string;
	file: File | Blob | Object;
	uploadProgressCallback?: (data: DownloadProgress) => void;
};

const createUploadEndpoint = ({
	akaveEndpointUrl = AKAVE_ENDPOINT_URL,
	bucketName,
}: {
	akaveEndpointUrl: string;
	bucketName: string;
}) => {
	return `${akaveEndpointUrl}/buckets/${bucketName}/files`;
};

// @warning: Seems only form data is working

export const uploadFileObject = ({
	akaveEndpointUrl = AKAVE_ENDPOINT_URL,
	bucketName,
	fileName,
	file,
}: UploadParams): Promise<any> => {
	const endpoint = createUploadEndpoint({
		akaveEndpointUrl,
		bucketName,
	});

	const options = typeof file === "string" ? { body: file } : { json: file };
	return ky.post(endpoint, options).then((res) => res.json());
};

export const uploadFileWithFormData = async ({
	akaveEndpointUrl = AKAVE_ENDPOINT_URL,
	bucketName,
	fileName,
	file,
	uploadProgressCallback,
}: UploadParams): Promise<any> => {
	const endpoint = createUploadEndpoint({
		akaveEndpointUrl,
		bucketName,
	});

	const formData = new FormData();
	// @ts-ignore
	formData.append("file", file);

	// Caused by: RequestContentLengthMismatchError: Request body length does not match content-length header

	// CORS error, to confirm if akave should work at browser
	return ky
		.post(endpoint, {
			body: formData,
			timeout: 7200000,
			onDownloadProgress: (progress: DownloadProgress) => {
				uploadProgressCallback?.(progress);
			},
		})
		.then((res) => res.json())
		.then((results: any) => {
			const { success, data } = results;
			if (success) {
				return data;
			}

			throw new Error("Upload Failed");
		});
};
