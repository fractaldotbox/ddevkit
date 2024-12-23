import { MutationOptions } from "@tanstack/react-query";
import { Config, SendTransactionErrorType } from "@wagmi/core";
import { Loader2 } from "lucide-react";
import { SmartAccountClient } from "permissionless";
import { Account, parseEther, zeroAddress } from "viem";
import { SmartAccount } from "viem/account-abstraction";
import { sepolia } from "viem/chains";
import { useSendTransaction } from "wagmi";
import { SendTransactionData, SendTransactionVariables } from "wagmi/query";
import { Button, ButtonProps } from "#components/shadcn/button";

type TransferButtonProps = {
	/** Amount to transfer in ETH */
	amount: number;
	/** Address to transfer to */
	to: string;
	/** Account to use for the transfer */
	account?: Account;
	/** Viem mutation options */
	mutationOptions?: MutationOptions<
		SendTransactionData,
		SendTransactionErrorType,
		SendTransactionVariables<Config, Config["chains"][number]["id"]>
	>;
	/** Custom handler for the transfer */
	onTransfer?: (txHash: string) => void;
	smartAccountClient?: SmartAccountClient;
} & ButtonProps;

export function TransferButton({
	amount,
	to,
	account,
	disabled,
	mutationOptions,
	onTransfer,
	smartAccountClient,
	...buttonProps
}: TransferButtonProps) {
	const { sendTransaction, isPending } = useSendTransaction();

	const handleTransfer = async () => {
		if (smartAccountClient) {
			const txHash = await smartAccountClient.sendTransaction({
				chain: sepolia,
				to: to as `0x${string}`,
				value: BigInt(amount),
				authorizationList: [],
				account: smartAccountClient.account as SmartAccount,
			});

			onTransfer?.(txHash);

			return;
		}

		sendTransaction(
			{
				to: to as `0x${string}`,
				value: parseEther(amount?.toString() ?? "0"),
				account,
			},
			mutationOptions,
		);
	};

	return (
		<Button
			onClick={handleTransfer}
			disabled={isPending || disabled}
			{...buttonProps}
		>
			{isPending && <Loader2 className="animate-spin w-4 h-4 mr-1" />}{" "}
			{account ? "Transfer" : "Connect Wallet"}
		</Button>
	);
}
