// TODO extract sample wagmi config

import { injected } from "@wagmi/connectors";
import { base, mainnet, optimism, optimismSepolia } from "viem/chains";
import { http, createConfig } from "wagmi";

export const WAGMI_CONFIG = createConfig({
	chains: [mainnet, base, optimism, optimismSepolia],
	connectors: [injected()],
	ssr: true,
	transports: {
		[mainnet.id]: http(),
		[base.id]: http(),
		[optimism.id]: http(),
		[optimismSepolia.id]: http(),
	},
});
