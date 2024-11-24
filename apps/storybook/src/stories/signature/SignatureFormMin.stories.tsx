import type { Meta, StoryObj } from "@storybook/react";
import { atom, useAtom } from "jotai";
import { addr } from "micro-eth-signer";

import { ScrollableCodeBlock } from "@/components/ScrollableCodeBlock";
import { TYPED_DATA } from "@/lib/signature/type-data";
import * as typed from "micro-eth-signer/typed-data";
import { EIP712Domain } from "micro-eth-signer/typed-data";
import { useMemo } from "react";
import type { Address } from "viem";
import { withMockAccount } from "../decorators/wagmi";
import { SignatureForm } from "./SignatureForm";
import { SignatureVerifyBadge } from "./SignatureVerifyBadge";
import { Hex, SignType, signEIP712MessageRaw, signMessageRaw } from "./sign";

export type VerifySignatureParams = {
	address: Address;
	message: any;
	signature: Hex;
};

const { types, primaryType, domain } = TYPED_DATA;

// for now couple everything and encapsulate to this hook
// end goal refactor for standalone code example for each story
const useSign = ({
	signType,
	privateKey,
	messageAtom,
}: {
	signType: SignType;
	privateKey: Hex;
	messageAtom: ReturnType<typeof atom<string>>;
}): any => {
	const [message] = useAtom(messageAtom);

	const typedData = useMemo(() => {
		const messageToVerify = {
			...TYPED_DATA.message,
			contents: message,
		};

		const typedData = {
			types,
			primaryType,
			domain: domain as unknown as EIP712Domain,
			message: messageToVerify,
		};
		return typedData;
	}, [signType, message]);

	if (signType === SignType.EIP191) {
		return {
			messageToVerify: message,
			signMessage: async (message: string) =>
				signMessageRaw(privateKey, message),
			verifyMessage: async ({
				signature,
				message,
				address,
			}: VerifySignatureParams) => {
				return typed.personal.verify(signature, message, address);
			},
		};
	}

	return {
		messageToVerify: typedData,
		signMessage: (message: string) =>
			signEIP712MessageRaw(privateKey, typedData),
		verifyMessage: async ({
			signature,
			message,
			address,
		}: VerifySignatureParams) => {
			return typed.verifyTyped(signature, message, address);
		},
	};
};

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
	const publicKeyAddress = addr.fromPrivateKey(privateKey) as Hex;

	const [signature] = useAtom(signatureAtom);

	const { signMessage, verifyMessage, messageToVerify } = useSign({
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
