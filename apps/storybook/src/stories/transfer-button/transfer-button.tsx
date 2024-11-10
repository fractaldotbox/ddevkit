import { Button, ButtonProps } from "@/components/ui/button";
import { MutationOptions } from "@tanstack/react-query";
import { Config, SendTransactionErrorType } from "@wagmi/core";
import { Loader2 } from "lucide-react";
import { Account, parseEther } from "viem";
import { useSendTransaction } from "wagmi";
import { SendTransactionData, SendTransactionVariables } from "wagmi/query";

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
} & ButtonProps;

export function TransferButton({
  amount,
  to,
  account,
  disabled,
  mutationOptions,
  ...buttonProps
}: TransferButtonProps) {
  const { sendTransaction, isPending } = useSendTransaction();

  const handleTransfer = () => {
    sendTransaction(
      {
        to: to as `0x${string}`,
        value: parseEther(amount.toString()),
        account,
      },
      mutationOptions
    );
  };

  return (
    <Button onClick={handleTransfer} disabled={isPending || disabled} {...buttonProps}>
      {isPending && <Loader2 className="animate-spin w-4 h-4 mr-1" />} {account ? "Transfer" : "Connect Wallet"}
    </Button>
  );
}
