import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const wagmiConfig = createConfig({
	chains: [base],
	multiInjectedProviderDiscovery: false,
	connectors: [
		coinbaseWallet({
			appName: "yourAppName",
			preference: "smartWalletOnly", // set this to `all` to use EOAs as well
			version: "4",
		}),
	],
	ssr: true,
	transports: {
		[base.id]: http(),
	},
});
