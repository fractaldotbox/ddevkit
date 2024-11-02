import { Button } from "@/components/ui/button";
import { parseEther } from "viem";
import { useAccount, useSendTransaction } from "wagmi";

interface TransferButtonProps {
  /** Amount to transfer in ETH */
  amount: number;
  /** Address to transfer to */
  to: string;
}

export function TransferButton({ amount, to }: TransferButtonProps) {
  const { address } = useAccount();
  const { sendTransaction, isPending } = useSendTransaction();

  const handleTransfer = async () => {
    if (!address) return;
    sendTransaction({
      to: to as `0x${string}`,
      value: parseEther(amount.toString()),
    });
  };

  return (
    <Button onClick={handleTransfer} disabled={isPending}>
      {address ? "Transfer" : "Connect Wallet"}
    </Button>
  );
}
