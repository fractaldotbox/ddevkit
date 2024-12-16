import { Chain, filecoin, filecoinCalibration } from "viem/chains";
import {
	CreateBlockExplorerUrlArgs,
	CreateExplorerUrl,
	Explorer,
	ExplorerConfig,
	ExplorerEntity,
	ExplorerParams,
	createBlockExplorerUrlWithEip3091,
} from "../explorer/url";

export const createFilfoxEndpoint = (
	chainId: number,
	locale: string = "en",
) => {
	let endpoint = "https://filfox.info/";
	if (chainId === filecoinCalibration.id) {
		endpoint = "https://calibration.filfox.info/";
	}

	return `${endpoint}${locale}`;
};

// For overrideBlockExplorers
export const createFilfoxExplorers = (locale: string = "") => {
	return {
		[filecoin.id]: {
			[Explorer.Filfox]: {
				name: Explorer.Filfox,
				url: `https://filfox.info/${locale}`,
				apiUrl: undefined,
			},
		},
		[filecoinCalibration.id]: {
			[Explorer.Filfox]: {
				name: Explorer.Filfox,
				url: `https://calibration.filfox.info/${locale}`,
				apiUrl: undefined,
			},
		},
	};
};

export const createOverrideStrategies = () => {
	return {
		[filecoin.id]: (createUrlArgs: CreateBlockExplorerUrlArgs) => {
			const { entity, params } = createUrlArgs;
			return createBlockExplorerUrlWithEip3091(
				createFilfoxEndpoint(filecoin.id, params?.locale),
				entity,
				params,
			);
		},
		[filecoinCalibration.id]: (createUrlArgs: CreateBlockExplorerUrlArgs) => {
			const { entity, params } = createUrlArgs;
			return createBlockExplorerUrlWithEip3091(
				createFilfoxEndpoint(filecoinCalibration.id, params?.locale),
				entity,
				params,
			);
		},
	};
};

export const createFilecoinExplorerUrl: CreateExplorerUrl = ({
	chain,
	entity,
	params,
	config,
}: {
	chain: Chain;
	entity: ExplorerEntity;
	params: ExplorerParams;
	config?: ExplorerConfig;
}) => {
	const endpoint = createFilfoxEndpoint(chain.id, config?.locale);

	return createBlockExplorerUrlWithEip3091(endpoint, entity, params);
};
