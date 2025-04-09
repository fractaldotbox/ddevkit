import type { Meta, StoryObj } from "@storybook/react";

import { TYPED_DATA } from "@geist/domain/signature/type-data";
import { SignatureForm } from "@geist/ui-react/components/signature/signature-form";

import { http, type Account } from "viem";
import { withMockAccount, withWagmiProvider } from "../decorators/wagmi";

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
			<div className="w-1/2">
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
			<div>
				{signType === SignType.EIP712 && (
					<div>
						<ScrollableCodeBlock title="Message" codeObject={messageToVerify} />
						<ScrollableCodeBlock
							title="Domain & Types"
							codeObject={{ domain, types }}
						/>
					</div>
				)}
			</div>
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
};

export const EIP712EOAWagmi: Story = {
	args: {
		signType: SignType.EIP712,
		signAccountType: SignAccountType.EOA,
		$input: map(initInput),
	},
	decorators: [withMockAccount(), withWagmiProvider()],
};
