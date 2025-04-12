import type { Meta, StoryObj } from "@storybook/react";

import { TYPED_DATA } from "@geist/domain/signature/type-data";
import { SignatureForm } from "@geist/ui-react/components/signature/signature-form";

import { expect, userEvent } from "@storybook/test";
import { http, type Account } from "viem";
import { withMockAccount, withWagmiProvider } from "../decorators/wagmi";
import { setupCanvas } from "../utils/test-utils";

import {
	type Hex,
	SignAccountType,
	SignType,
} from "@geist/domain/signature/sign";
import { ScrollableCodeBlock } from "@geist/ui-react/components/scrollable-code-block";
import { SignatureVerifyBadge } from "@geist/ui-react/components/signature/signature-verify-badge";
import { useSignWagmi } from "@geist/ui-react/hooks/signature/use-sign-wagmi";
import { type MapStore, map } from "nanostores";

const { types, primaryType, domain } = TYPED_DATA;

const SignatureFormWagmi = ({
	account,
	signType,
	$input,
	signAccountType = SignAccountType.EOA,
}: {
	account?: Account;
	signType: SignType;
	$input: MapStore<{
		message: string;
		signature: Hex;
	}>;
	signAccountType?: SignAccountType;
}) => {
	const { signMessage, verifySignature, messageToVerify, signature, isReady } =
		useSignWagmi({
			account,
			signType,
			$input,
		});

	return (
		<div className="flex flex-row">
			<div className="w-full">
				Type: {signType} - {signAccountType}
				{signMessage && (
					<SignatureForm
						$input={$input}
						signMessage={async (message: Hex) => {
							return signMessage(message);
						}}
					/>
				)}
				{verifySignature && account?.address && (
					<SignatureVerifyBadge
						address={account.address!}
						message={messageToVerify}
						signature={signature}
						verify={async () =>
							await verifySignature({
								address: account.address,
								message: messageToVerify,
							})
						}
					/>
				)}
			</div>
			{signType === SignType.EIP712 && (
				<div className="w-full">
					<div>
						<ScrollableCodeBlock title="Message" codeObject={messageToVerify} />
						<ScrollableCodeBlock
							title="Domain & Types"
							codeObject={{ domain, types }}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

const meta = {
	title: "Signature/SignatureForm",
	component: SignatureFormWagmi,
} satisfies Meta<typeof SignatureFormWagmi>;

export default meta;
type Story = StoryObj<typeof meta>;

const initInput = {
	message: "",
	signature: "" as Hex,
};

export const Wagmi: Story = {
	args: {
		signType: SignType.EIP191,
		signAccountType: SignAccountType.EOA,
		$input: map(initInput),
	},
	decorators: [withMockAccount(), withWagmiProvider()],
	play: async ({ canvasElement }) => {
		const { canvas } = await setupCanvas(canvasElement, 2000);

		const typeInfo = await canvas.findByText(/EIP191 - EOA/);
		expect(typeInfo).toBeInTheDocument();

		const messageInput = await canvas.getByRole("textbox");
		expect(messageInput).toBeInTheDocument();

		// Check sign button exists
		const signButton = await canvas.getByRole("button", {
			name: /Sign Message/i,
		});
		expect(signButton).toBeInTheDocument();

		await userEvent.type(messageInput, "Hello World");

		await userEvent.click(signButton);

		await new Promise((resolve) => setTimeout(resolve, 2000));

		const verificationBadge = await canvas.findByText(/Verified!/i);
		expect(verificationBadge).toBeInTheDocument();
	},
};

export const EIP712EOAWagmi: Story = {
	args: {
		signType: SignType.EIP712,
		signAccountType: SignAccountType.EOA,
		$input: map(initInput),
	},
	decorators: [withMockAccount(), withWagmiProvider()],
	play: async ({ canvasElement }) => {
		const { canvas } = await setupCanvas(canvasElement, 2000);

		const typeInfo = await canvas.findByText(/EIP712 - EOA/);
		expect(typeInfo).toBeInTheDocument();

		const messageInput = await canvas.getByRole("textbox");
		expect(messageInput).toBeInTheDocument();

		const signButton = await canvas.getByRole("button", {
			name: /Sign Message/i,
		});
		expect(signButton).toBeInTheDocument();

		await userEvent.type(messageInput, "Hello World");

		await userEvent.click(signButton);

		await new Promise((resolve) => setTimeout(resolve, 2000));

		const verificationBadge = await canvas.findByText(/Verified!/i);
		expect(verificationBadge).toBeInTheDocument();

		const messageCodeBlock = await canvas.findByText(/Hello World/i);
		expect(messageCodeBlock).toBeInTheDocument();
	},
};
