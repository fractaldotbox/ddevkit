// TODO extract sample wagmi config

import { base, mainnet, optimism, optimismSepolia } from "viem/chains";
import { http, type CreateConfigParameters } from "@wagmi/core";
import { injected } from "wagmi/connectors";

export const WAGMI_CONFIG_PARAMS = {
	chains: [mainnet, base, optimism, optimismSepolia],
	connectors: [injected()],
	ssr: true,
	transports: {
		[mainnet.id]: http(),
		[base.id]: http(),
		[optimism.id]: http(),
		[optimismSepolia.id]: http(),
	},
} as CreateConfigParameters;
