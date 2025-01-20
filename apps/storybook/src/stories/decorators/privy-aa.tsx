import { PrivyAAProvider } from "@geist/ui-react/components/privy-aa/provider.js";
import { WAGMI_CONFIG } from "@geist/ui-react/lib/utils/wagmi-config.js";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const withPrivyAAProvider = ({ appId }: { appId: string }) => {
	return (Story: any) => (
		<div>
			<PrivyAAProvider
				appId={appId}
				queryClient={queryClient}
				wagmiConfig={WAGMI_CONFIG}
				privyConfig={{}}
			>
				{Story()}
			</PrivyAAProvider>
		</div>
	);
};
