import type { Meta, StoryObj } from "@storybook/react";
import { Atom, atom, useAtom } from "jotai";

import { withMockAccount, withWagmiProvider } from "../decorators/wagmi";
import { useSignMessage } from "wagmi";
import { SignatureForm } from "./SignatureForm";
import { Hex, SignAccountType, SignType } from "./sign";
import { SignatureVerifyBadge } from "./SignatureVerifyBadge";
import {
    Account,
    createPublicClient,
    createWalletClient,
    http,
    verifyMessage,
} from "viem";
import { TYPED_DATA } from "@/lib/signature/type-data";
import { useMemo } from "react";
import { ScrollableCodeBlock } from "@/components/ScrollableCodeBlock";
import { sepolia } from "viem/chains";

const { types, primaryType, domain } = TYPED_DATA;

// TODO wagmi style
type UseSignReturnType = {
    isReady: boolean;
    messageToVerify?: any;
    signature?: any;
    signMessage?: (message: Hex) => Promise<Hex>;
    verifySignature?: (args: { address: Hex; message: any }) => Promise<boolean>;
};

const useSign = ({
    account,
    signType,
    messageAtom,
    signatureAtom,
}: {
    account: Account | undefined;
    signType: SignType;
    messageAtom: Atom<string>;
    signatureAtom: Atom<Hex>;
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

    const [message] = useAtom(messageAtom);
    const [signature] = useAtom(signatureAtom);
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
        message: any;
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

const SignatureFormWagmi = ({
    account,
    signType,
    messageAtom,
    signatureAtom,
    signAccountType = SignAccountType.EOA,
}: {
    account?: Account;
    signType: SignType;
    messageAtom: ReturnType<typeof atom<string>>;
    signatureAtom: ReturnType<typeof atom<Hex>>;
    signAccountType?: SignAccountType;
}) => {


    const { signMessage, verifySignature, messageToVerify, signature, isReady } =
        useSign({
            account,
            signType,
            messageAtom,
            signatureAtom,
        });

    return (
        <div className="flex flex-row">
            <div className="w-1/2">
                Type: {signType} - {signAccountType}
                {signMessage && (
                    <SignatureForm
                        messageAtom={messageAtom}
                        signatureAtom={signatureAtom}
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

export const Wagmi: Story = {
    args: {
        signType: SignType.EIP191,
        signAccountType: SignAccountType.EOA,
        messageAtom: atom(""),
        signatureAtom: atom("" as Hex),
    },
    decorators: [withMockAccount(), withWagmiProvider()],
};

export const EIP712EOAWagmi: Story = {
    args: {
        signType: SignType.EIP712,
        signAccountType: SignAccountType.EOA,
        messageAtom: atom(""),
        signatureAtom: atom("" as Hex),
    },
    decorators: [withMockAccount(), withWagmiProvider()],
};
