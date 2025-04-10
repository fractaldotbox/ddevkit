import { TYPED_DATA } from "@geist/domain/signature/type-data";
import { useStore } from "@nanostores/react";
import { type MapStore, map } from "nanostores";
import { useMemo } from "react";
import {
	http,
	type Account,
	type Hex,
	createPublicClient,
	createWalletClient,
	verifyMessage,
} from "viem";
import { sepolia } from "viem/chains";
import { useSignMessage } from "wagmi";
import { SignType } from "#lib/signature/sign";

type UseSignReturnType = {
	isReady: boolean;
	messageToVerify?: any;
	signature?: any;
	signMessage?: (message: Hex) => Promise<Hex>;
	verifySignature?: (args: { address: Hex; message: any }) => Promise<boolean>;
};

const { types, primaryType, domain } = TYPED_DATA;

export const useSignWagmi = ({
	account,
	signType,
	$input,
}: {
	account: Account | undefined;
	signType: SignType;
	$input: MapStore;
}): UseSignReturnType => {
	if (!account) {
		return {
			isReady: false,
		};
	}
	// temp workaround before account hoisting
	const walletClient = createWalletClient({
		account,
		chain: sepolia,
		transport: http(),
	});

	const publicClient = createPublicClient({
		chain: sepolia,
		transport: http(),
	});

	const { message, signature } = useStore($input);
	const { signMessageAsync } = useSignMessage();

	// type satisfies TypedData here
	const { messageToVerify, typedData } = useMemo(() => {
		const messageToVerify =
			signType === SignType.EIP191
				? message
				: {
						...TYPED_DATA.message,
						contents: message,
					};

		const typedData = {
			types,
			primaryType,
			domain,
			message: messageToVerify,
		};
		return {
			messageToVerify,
			typedData,
		};
	}, [signType, account, message]);

	const signMessage = async (message: Hex) => {
		if (signType === SignType.EIP712) {
			return walletClient.signTypedData(typedData as any);
		}
		return await signMessageAsync({
			account,
			message,
		});
	};

	const verifySignature = async ({
		address,
		message,
	}: {
		address: Hex;
		message: string;
	}) => {
		if (signType === SignType.EIP712) {
			return publicClient.verifyTypedData({
				address,
				domain,
				types,
				primaryType,
				message,
				signature,
			} as any);
		}
		return verifyMessage({
			address,
			message,
			signature,
		});
	};

	return {
		isReady: true,
		messageToVerify,
		signature,
		signMessage,
		verifySignature,
	} satisfies UseSignReturnType;
};
