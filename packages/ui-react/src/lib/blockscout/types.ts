export interface NFTResponse {
	is_unique: boolean;
	id: string;
	holder_address_hash?: string;
	image_url?: string;
	animation_url?: string;
	external_app_url?: string;
	metadata?: NFTResponseMetadata;
	owner: Owner;
	token: Token;
}

export interface NFTResponseMetadata {
	year?: number;
	tags?: string[];
	name?: string;
	image_url?: string;
	home_url?: string;
	external_url?: string;
	description?: string;
	attributes?: Attribute[];
}

export interface Attribute {
	value: string;
	trait_type: string;
}

export interface Owner {
	hash: string;
	implementation_name: string;
	name: string;
	ens_domain_name?: string;
	metadata?: OwnerMetadata;
	is_contract: boolean;
	private_tags: Tag[];
	watchlist_names: WatchlistName[];
	public_tags: Tag[];
	is_verified: boolean;
}

export interface OwnerMetadata {
	slug: string;
	name: string;
	tagType: string;
	ordinal: number;
	meta: Meta;
}

export interface Meta {}

export interface Tag {
	address_hash: string;
	display_name: string;
	label: string;
}

export interface WatchlistName {
	display_name: string;
	label: string;
}

export interface Token {
	circulating_market_cap: string;
	icon_url: string;
	name: string;
	decimals: string;
	symbol: string;
	address: string;
	type: string;
	holders: string;
	exchange_rate: string;
	total_supply: string;
}
