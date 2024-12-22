import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { PropsWithChildren } from "react";
import { Button } from "#components/shadcn/button";

export function PrivyLoginProvider({
	children,
	appId,
}: PropsWithChildren<{ appId: string }>) {
	return (
		<PrivyProvider
			appId={appId}
			config={{
				appearance: {
					theme: "light",
					accentColor: "#676FFF",
				},
				embeddedWallets: {
					createOnLogin: "users-without-wallets",
				},
			}}
		>
			{children}
		</PrivyProvider>
	);
}

export function PrivyLogin() {
	const { ready: isReady, authenticated: isAuthenticated, login } = usePrivy();
	const disableLogin = !isReady || (isReady && isAuthenticated);

	return (
		<Button disabled={disableLogin} onClick={login}>
			Login
		</Button>
	);
}
