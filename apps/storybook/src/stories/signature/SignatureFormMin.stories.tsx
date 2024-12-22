import { Hex, SignType } from "@geist/domain/signature/sign";
import { TYPED_DATA } from "@geist/domain/signature/type-data";
import { ScrollableCodeBlock } from "@geist/ui-react/components/scrollable-code-block";
import { SignatureForm } from "@geist/ui-react/components/signature/signature-form";
import { SignatureVerifyBadge } from "@geist/ui-react/components/signature/signature-verify-badge";
import { useSign } from "@geist/ui-react/hooks/signature/use-sign";
import type { Meta, StoryObj } from "@storybook/react";
import { atom, useAtom } from "jotai";
import { withMockAccount } from "../decorators/wagmi";

const { types, primaryType, domain } = TYPED_DATA;

const SignatureFormMinimal = ({
	privateKey,
	signType = SignType.EIP191,
	messageAtom,
	signatureAtom,
}: {
	privateKey: Hex;
	signType: SignType;
	messageAtom: ReturnType<typeof atom<string>>;
	signatureAtom: ReturnType<typeof atom<Hex>>;
}) => {
	const [signature] = useAtom(signatureAtom);

	const { publicKeyAddress, signMessage, verifyMessage, messageToVerify } =
		useSign({
			privateKey,
			signType,
			messageAtom,
		});

	return (
		<div className="flex flex-row">
			<div className="w-1/2">
				{signType}
				<SignatureForm
					messageAtom={messageAtom}
					signatureAtom={signatureAtom}
					signMessage={async (message: string) => {
						return signMessage(message);
					}}
				/>

				<SignatureVerifyBadge
					address={publicKeyAddress}
					message={messageToVerify}
					signature={signature}
					verify={async ({ signature, message, address }) =>
						verifyMessage({ signature, message, address })
					}
				/>
			</div>
			<div>
				{signType === SignType.EIP712 && (
					<div>
						<ScrollableCodeBlock
							title="Message"
							codeObject={messageToVerify.message}
						/>
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
	title: "Signature/SignatureFormMinimal",
	component: SignatureFormMinimal,
} satisfies Meta<typeof SignatureFormMinimal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = {
	// @ts-ignore
	args: {
		signType: SignType.EIP191,
		messageAtom: atom(""),
		signatureAtom: atom("" as Hex),
	},
	decorators: [withMockAccount()],
};

export const EIP712Minimal: Story = {
	// @ts-ignore
	args: {
		signType: SignType.EIP712,
		messageAtom: atom(""),
		signatureAtom: atom("" as Hex),
	},
	decorators: [withMockAccount()],
};
