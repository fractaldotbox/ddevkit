import { BY_USER, getRandomAccount } from "@geist/domain/user.fixture";
import { WAGMI_CONFIG_PARAMS } from "@geist/ui-react/lib/utils/wagmi-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mock } from "@wagmi/connectors";
import type { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {
	type Config,
	type CreateConfigParameters,
	WagmiProvider,
	createConfig,
} from "wagmi";

const createMockConfig = (
	wagmiConfigParams: CreateConfigParameters,
	isStable = true,
) => {
	const privateKey = isStable
		? BY_USER.user.privateKey
		: (getRandomAccount().privateKey as Hex);
	const account = privateKeyToAccount(privateKey);

	const config = createConfig({
		...wagmiConfigParams,
		connectors: [
			...(wagmiConfigParams.connectors || []),
			mock({
				accounts: [account?.address],
				features: {
					defaultConnected: true,
				},
			}),
		],
	});
	return {
		account,
		privateKey,
		config,
	};
};

const QueryClientProviderWrapper = ({
	children,
}: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<div>{children}</div>
		</QueryClientProvider>
	);
};

export const withQueryClientProvider = () => {
	return (Story: any) => (
		<div>
			<QueryClientProviderWrapper>
				<Story />
			</QueryClientProviderWrapper>
		</div>
	);
};

export const withMockAccount = () => {
	return (Story: any, context: any) => {
		// Not possible to hoist a private key based account. Inject at action
		// https://wagmi.sh/react/guides/viem#private-key-mnemonic-accounts
		const { account, privateKey, config } =
			createMockConfig(WAGMI_CONFIG_PARAMS);
		return (
			<>
				<Story
					args={{ account, privateKey, config, ...(context.args || {}) }}
				/>
			</>
		);
	};
};

export const withWagmiProvider = () => {
	const { config } = createMockConfig(WAGMI_CONFIG_PARAMS);
	return (Story: any) => (
		<div>
			<QueryClientProviderWrapper>
				<WagmiProvider config={config}>
					<Story />
				</WagmiProvider>
			</QueryClientProviderWrapper>
		</div>
	);
};
