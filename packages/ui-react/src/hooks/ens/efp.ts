import type { Address } from "viem";

export type AddressOrEns = Address | string;

export type EfpFollower = {
	address: Address;
	is_blocked: boolean;
	is_following: boolean;
};

export type EfpRecord = {
	data: string;
	record_type: "address";
};

export type EfpEnsData = {
	name: string;
	address: Address;
	avatar: string;
	records: {
		avatar?: string;
		"com.discord"?: string;
		"com.github"?: string;
		"com.twitter"?: string;
		description?: string;
		email?: string;
		header?: string;
		location?: string;
		name?: string;
		"org.telegram"?: string;
		url?: string;
		[key: string]: string | undefined;
	};
	updated_at: string;
};

export type EfpUserStats = {
	followers_count: string;
	following_count: string;
};

export type EfpApiOptions = {
	limit?: number;
	sort?: any;
};

export type EfpFollowerWithName = EfpFollower & { name?: string };
