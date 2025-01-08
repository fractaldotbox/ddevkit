import { TransferButton } from "@geist/ui-react/components/transfer/transfer-button";
import { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import type { Account } from "viem";
import { Label } from "#components/ui/label";
import { withMockAccount, withWagmiProvider } from "../decorators/wagmi";
interface TransferButtonProps {
	to: string;
	account?: Account;
}

const TransferButtonStory = ({ to, account }: TransferButtonProps) => {
	const [amount, setAmount] = useState("0.001");

	const isValid = useMemo(() => {
		return /([0-9]+\.)?[0-9]+$/.test(amount);
	}, [amount]);

	return (
		<div className="flex flex-col gap-2">
			<Label>Amount</Label>
			<div className="flex items-center gap-2 relative border border-primary rounded-md pr-2 overflow-hidden">
				<input
					placeholder="0"
					type="number"
					value={String(amount)}
					onChange={(e) => {
						const value = e.target.value;
						setAmount(value);
					}}
					className="border-none bg-white outline-none focus-within:outline-none px-4 focus:outline-none h-10 flex-1"
				/>
				<p>ETH</p>
			</div>
			<TransferButton
				to={to}
				amount={Number(amount)}
				account={account}
				disabled={!isValid}
			/>
		</div>
	);
};

const meta = {
	title: "Transfer/TransferButton",
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
