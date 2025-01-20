import { type PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	type PimlicoClient,
	createPimlicoClient,
} from "permissionless/clients/pimlico";
import {
	type PropsWithChildren,
	createContext,
	useContext,
	useState,
} from "react";
import { http } from "viem";
import { entryPoint07Address } from "viem/account-abstraction";
import { sepolia } from "viem/chains";
import { WagmiProvider, createConfig } from "wagmi";
import { generatePimlicoRpcUrl } from "./utils";

interface PrivyAAContextProps {
	appId: string;
}

interface PrivyAAContext {
	appId: string;
	pimlicoClient: PimlicoClient;
	pimlicoRpcUrl: string;
}

const privyConfig: PrivyClientConfig = {
	embeddedWallets: {
		createOnLogin: "users-without-wallets",
		requireUserPasswordOnCreate: true,
		noPromptOnSignature: false,
	},
	loginMethods: ["wallet", "email", "sms"],
	appearance: {
		showWalletLoginFirst: true,
	},
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const wagmiConfig = createConfig({
	chains: [sepolia],
	transports: {
		[sepolia.id]: http(),
	},
});

const PrivyAAContext = createContext<PrivyAAContext>(undefined as never);

export function PrivyAAProvider({
	children,
	appId,
}: PropsWithChildren<PrivyAAContextProps>) {
	const pimlicoRpcUrl = generatePimlicoRpcUrl(sepolia.id);

	const [pimlicoClient] = useState(
		createPimlicoClient({
			transport: http(pimlicoRpcUrl),
			entryPoint: {
				address: entryPoint07Address,
				version: "0.7",
			},
		}),
	);

	return (
		<PrivyAAContext.Provider value={{ appId, pimlicoClient, pimlicoRpcUrl }}>
			<PrivyProvider appId={appId} config={privyConfig}>
				<QueryClientProvider client={queryClient}>
					<WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
						{children}
					</WagmiProvider>
				</QueryClientProvider>
			</PrivyProvider>
		</PrivyAAContext.Provider>
	);
}

export function usePrivyAA() {
	const context = useContext(PrivyAAContext);

	if (!context) {
		throw new Error("Missing PrivyAAContext");
	}

	return context;
}
