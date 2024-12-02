import { Button } from "@/components/ui/button";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { PropsWithChildren } from "react";

export function PrivyLoginProvider({ children }: PropsWithChildren) {
	return (
		<PrivyProvider
			appId="cm2vi1gua0aukbq4p69w3rphl"
			config={{
				// Customize Privy's appearance in your app
				appearance: {
					theme: "light",
					accentColor: "#676FFF",
				},
				// Create embedded wallets for users who don't have a wallet
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
	const { ready, authenticated, login } = usePrivy();
	// Disable login when Privy is not ready or the user is already authenticated
	const disableLogin = !ready || (ready && authenticated);

	return (
		<Button disabled={disableLogin} onClick={login}>
			Login
		</Button>
	);
}
