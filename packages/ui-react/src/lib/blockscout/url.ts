import { getBlockscoutChainEndpoint } from "../blockscout/chain";
import {
	CreateBlockExplorerUrlArgs,
	createBlockExplorerUrlWithEip3091,
} from "../explorer/url";

// For overrideBlockExplorers
export const createOverrideStrategies = () => {
	return {
		default: (createUrlArgs: CreateBlockExplorerUrlArgs) => {
			const { entity, params } = createUrlArgs;
			return createBlockExplorerUrlWithEip3091(
				getBlockscoutChainEndpoint(createUrlArgs?.chain),
				entity,
				params,
			);
		},
	};
};
