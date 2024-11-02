import { Button } from "@/components/ui/button";
import { Account, parseEther } from "viem";
import { useSendTransaction } from "wagmi";

interface TransferButtonProps {
  /** Amount to transfer in ETH */
  amount: number;
  /** Address to transfer to */
  to: string;
  /** Account to use for the transfer */
  account?: Account;
}

export function TransferButton({ amount, to, account }: TransferButtonProps) {
  const { sendTransaction, isPending } = useSendTransaction();

  const handleTransfer = () => {
    sendTransaction({
      to: to as `0x${string}`,
      value: parseEther(amount.toString()),
      account,
    });
  };

  return (
    <Button onClick={handleTransfer} disabled={isPending}>
      {account ? "Transfer" : "Connect Wallet"}
    </Button>
  );
}
