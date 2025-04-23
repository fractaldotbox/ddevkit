import config from "@geist/domain/config";
import ky from "ky";
import type { Address } from "viem";

/**
 * Creates a URL for the Passport API endpoint
 */
export const createEndpointUrl = (
	path: string,
	queryParams?: Record<string, string>,
) => {
	const url = `${config.passport.endpointUrl}${path}`;
	if (!queryParams) return url;

	const params = new URLSearchParams();
	Object.entries(queryParams).forEach(([key, value]) => {
		if (value) params.append(key, value);
	});

	const queryString = params.toString();
	return queryString ? `${url}?${queryString}` : url;
};

export const createFetchOptions = (
	path: string,
	queryParams?: Record<string, any>,
) => {
	return {
		url: createEndpointUrl(path, queryParams),
		options: {
			headers: {
				accept: "application/json",
				"X-API-Key": config.passport.apiKey,
			},
		},
	};
};

export type PassportScore = {
	address: string;
	score: number;
	status: "PROCESSED" | "PROCESSING" | "FAILED";
	error?: string;
	updatedAt: string;
};

export type PassportScoreResponse = {
	address: string;
	details: {
		models: {
			[key: string]: {
				score: number;
			};
		};
	};
};

export type ScorerResponse = {
	id: string;
	name: string;
	description: string;
	recommendedThreshold: number;
};

export type StampResponse = {
	id: string;
	name: string;
	description: string;
	scorerId: string;
};

export type StampMetadata = {
	name: string;
	description: string;
	hash: string;
};

export type StampMetadataResponse = {
	id: string;
	icon: string;
	name: string;
	description: string;
	connectMessage: string;
	groups: [
		{
			name: string;
			stamps: StampMetadata[];
		},
	];
};

export type SubmitScoreRequest = {
	address: string;
	community?: string;
	scorer?: string;
};

export type StampsByAddressResponse = {
	next: string;
	prev: string;
	items: [
		{
			version: string;
			credential: {};
			metadata: {
				group: string;
				platform: {
					id: string;
					icon: string;
					name: string;
					description: string;
					connectMessage: string;
				};
				name: string;
				description: string;
				hash: string;
			};
		},
	];
};

export type StampsBasedScoreByAddress = {
	address: "string";
	score: 0;
	passing_score: true;
	last_score_timestamp: "string";
	expiration_timestamp: "string";
	threshold: 0;
	error: "string";
	stamps: {
		[key: string]: {
			score: string;
			expiration_date: string;
		};
	}[];
};

/**
 * Get passport score for a specific address
 */
export async function getScoreWithAddress(
	address: Address,
	model: string = "aggregate",
): Promise<PassportScoreResponse> {
	const { url, options } = createFetchOptions(`/v2/models/score/${address}`, {
		model,
	});
	const response = await ky.get(url, options);
	return await response.json<PassportScoreResponse>();
}

/**
 * Submit a request to compute a passport score for an address
 */
export async function submitScore(
	request: SubmitScoreRequest,
): Promise<PassportScoreResponse> {
	const { url, options } = createFetchOptions("/v2/score");
	const response = await ky.post(url, {
		...options,
		json: request,
	});
	return await response.json<PassportScoreResponse>();
}

/**
 * Get all available scorers
 */
export async function getScorers(): Promise<ScorerResponse[]> {
	const url = createEndpointUrl("/v2/scorers");
	const response = await ky.get(url);
	return await response.json<ScorerResponse[]>();
}

/**
 * Get all available stamps
 */
export async function getStampsMetadata(): Promise<StampMetadataResponse[]> {
	const { url, options } = createFetchOptions("/registry/stamp-metadata");
	const response = await ky.get(url, options);
	return await response.json<StampMetadataResponse[]>();
}

/**
 * Get all stamps for a specific address
 */
export async function getStampsByAddress(
	address: string,
	isIncludeMetadata: boolean = false,
): Promise<StampsByAddressResponse> {
	const { url, options } = createFetchOptions(`/v2/stamps/${address}`, {
		include_metadata: isIncludeMetadata,
	});
	const response = await ky.get(url, options);
	return await response.json<StampsByAddressResponse>();
}

/**
 * Retrieve Stamp-based unique humanity score for a specified address
 */
export async function getStampsWithScorerIdAddress(
	address: string,
	scorerId: number,
	isIncludeMetadata: boolean = false,
): Promise<StampsBasedScoreByAddress> {
	const { url, options } = createFetchOptions(
		`/v2/stamps/${scorerId}/score/${address}`,
		{
			limit: 1000,
			include_metadata: isIncludeMetadata,
		},
	);
	const response = await ky.get(url, options);
	return await response.json<StampsBasedScoreByAddress>();
}
