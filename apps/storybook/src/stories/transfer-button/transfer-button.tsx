import { Button } from "@/components/ui/button";
import { MutationOptions } from "@tanstack/react-query";
import { Config, SendTransactionErrorType } from "@wagmi/core";
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
} & MutationOptions<
  SendTransactionData,
  SendTransactionErrorType,
  SendTransactionVariables<Config, Config["chains"][number]["id"]>
>;

export function TransferButton({ amount, to, account, ...mutationOptions }: TransferButtonProps) {
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
    <Button onClick={handleTransfer} disabled={isPending}>
      {account ? "Transfer" : "Connect Wallet"}
    </Button>
  );
}
