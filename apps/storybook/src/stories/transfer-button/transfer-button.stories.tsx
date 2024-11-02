import { Input } from "@/components/ui/input";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TransferButton } from "./transfer-button";
import { withMockAccount, withWagmiProvider } from "../decorators/wagmi";
import { Label } from "@/components/ui/label";
interface TransferButtonProps {
  to: string;
}

const TransferButtonStory = ({ to }: TransferButtonProps) => {
  const [amount, setAmount] = useState(0.001);

  return (
    <div className="flex flex-col gap-2">
      <Label>Amount</Label>
      <div className="flex gap-2 relative">
        <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <p className="absolute right-3 top-0 bottom-0 flex items-center">ETH</p>
      </div>
      <TransferButton to={to} amount={amount} />
    </div>
  );
};

const meta = {
  title: "UI/TransferButton",
  component: TransferButtonStory,
} satisfies Meta<typeof TransferButtonStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  },
  decorators: [withMockAccount(), withWagmiProvider()],
};
