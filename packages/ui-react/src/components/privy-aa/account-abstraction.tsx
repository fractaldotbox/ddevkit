import {
	type ConnectedWallet,
	usePrivy,
	useWallets,
} from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import {
	type SmartAccountClient,
	createSmartAccountClient,
} from "permissionless";
import { toSimpleSmartAccount } from "permissionless/accounts";
import { useEffect, useMemo, useState } from "react";
import { zeroAddress } from "viem";
import { entryPoint07Address } from "viem/account-abstraction";
import { sepolia } from "viem/chains";
import { http, useAccount, usePublicClient, useWalletClient } from "wagmi";

import { Button } from "#components/shadcn/button";
import { TransferButton } from "#components/transfer/transfer-button";
import { usePrivyAA } from "./provider";

export function PrivyAAFlow() {
	const { pimlicoRpcUrl, pimlicoClient } = usePrivyAA();
	const { login, ready: isReady, authenticated: isAuthenticated } = usePrivy();

	const { isConnected } = useAccount();
	const [smartAccountClient, setSmartAccountClient] =
		useState<SmartAccountClient | null>(null);

	const publicClient = usePublicClient();
	const { wallets, ready: isWalletsReady } = useWallets();
	const { data: walletClient } = useWalletClient();

	const embeddedWallet = useMemo(
		() => wallets.find((wallet) => wallet.walletClientType === "privy"),
		[wallets],
	);

	const { setActiveWallet } = useSetActiveWallet();

	useEffect(() => {
		(async () => {
			if (isConnected && walletClient && publicClient && embeddedWallet) {
				const owner = await embeddedWallet.getEthereumProvider();

				if (!owner) {
					throw new Error("No owner found");
				}

				const simpleSmartAccount = await toSimpleSmartAccount({
					owner,
					client: publicClient,
					entryPoint: {
						address: entryPoint07Address,
						version: "0.7",
					},
				});

				const smartAccountClient = createSmartAccountClient({
					account: simpleSmartAccount,
					chain: sepolia,
					bundlerTransport: http(pimlicoRpcUrl),
					paymaster: pimlicoClient,
					userOperation: {
						estimateFeesPerGas: async () => {
							return (await pimlicoClient.getUserOperationGasPrice()).fast;
						},
					},
				});

				setSmartAccountClient(smartAccountClient);
			}
		})();
	}, [isConnected, walletClient, publicClient]);

	if (!isReady) {
		return null;
	}

	if (isConnected && smartAccountClient && embeddedWallet) {
		return (
			<div>
				<TransferButton
					amount={0}
					to={zeroAddress}
					smartAccountClient={smartAccountClient}
				/>
			</div>
		);
	}

	return (
		<>
			{!isAuthenticated && <Button onClick={login}>Sign in with Privy</Button>}

			{isWalletsReady &&
				wallets.map((wallet: ConnectedWallet) => {
					return (
						<Button
							key={wallet.address}
							onClick={async () => {
								// @ts-ignore
								await setActiveWallet(wallet);
							}}
						>
							Make active: {wallet.address}
						</Button>
					);
				})}
		</>
	);
}
