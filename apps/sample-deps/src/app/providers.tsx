"use client";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";

import { wagmiConfig } from "@/wagmi";

export function Providers(props: {
	children: ReactNode;
	initialState?: State;
}) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<WagmiProvider config={wagmiConfig} initialState={props.initialState}>
			<QueryClientProvider client={queryClient}>
				<OnchainKitProvider
					apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
					chain={base}
				>
					{props.children}
				</OnchainKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
