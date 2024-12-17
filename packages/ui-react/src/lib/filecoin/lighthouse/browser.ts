import { lighthouseConfig } from "@lighthouse-web3/sdk/dist/lighthouse.config";
// This is custom implementation of lighthouse browser client due to below issue and preference of ky for timeout
// https://github.com/lighthouse-web3/lighthouse-package/issues/119
import {
	DealParameters,
	UploadFileReturnType,
} from "@lighthouse-web3/sdk/dist/types";
import ky, { DownloadProgress } from "ky";

export const createLighthouseEndpoint = (isWrapWithDirectory = false) => {
	const search = new URLSearchParams(
		"wrap-with-directory=" + isWrapWithDirectory,
	);
	return lighthouseConfig.lighthouseNode + `/api/v0/add?${search.toString()}`;
};

export type UploadLighthouseParams = {
	config: {
		accessToken: string;
		timeout?: number;
	};
	formData?: FormData;
	files?: File[];
	dealParameters?: DealParameters | undefined;
	// use DownloadProgress over IUploadProgressCallback for more metadata
	uploadProgressCallback?: (data: DownloadProgress) => void;
};

export const asFormData = (formData?: FormData, files?: File[]) => {
	if (!formData) {
		if (!files) {
			throw new Error("No files provided");
		}
		const formData = new FormData();
		for (const file of files) {
			formData.append("file", file);
		}

		return formData;
	}
	return formData;
};

/**
 *
 * Note for posting to lighthouse endpoint, only single cid is returned
 * and when multiple files are submitted (via form data) only one file is uploaded
 *
 * Thus multiple files will always be wrapped into directory
 * and it's required to explicitly use the wrap-with-directory=true flag,
 * and =false otherwise for directory / single file
 *
 * Note progress is for all files not individual
 *
 */
export const uploadFiles = async <T extends boolean>(
	params: UploadLighthouseParams,
): Promise<{ data: UploadFileReturnType<T> }> => {
	const { config, dealParameters, uploadProgressCallback } = params;

	const { accessToken, timeout = 7200000 } = config;
	const formData = asFormData(params.formData, params.files);

	const directoryFiles = formData.getAll("directory") as File[];

	const files = formData.getAll("file") as File[];

	const isDirectory =
		directoryFiles.length > 0 ||
		[...files].some((file) => file.webkitRelativePath);

	const isWrapWithDirectory = isDirectory || files.length > 1;

	let endpoint = createLighthouseEndpoint(isWrapWithDirectory);

	const token = `Bearer ${accessToken}`;

	const headers = new Headers({
		Authorization: token,
		"X-Deal-Parameter": dealParameters
			? JSON.stringify(dealParameters)
			: "null",
	});

	const http = ky.create({
		timeout,
		headers,
	});

	const results = await http
		.post<UploadFileReturnType<T>>(endpoint, {
			body: formData,
			onDownloadProgress: (progress: DownloadProgress) => {
				if (uploadProgressCallback) {
					uploadProgressCallback(progress);
				}
			},
		})
		.json();

	return {
		data: results,
	};
};

export default uploadFiles;
