import type { Meta, StoryObj } from '@storybook/react';
import { addr } from 'micro-eth-signer';
import { Atom, atom, useAtom } from 'jotai'

import * as typed from 'micro-eth-signer/typed-data';
import { SignatureForm } from './SignatureForm';
import { Hex, signEIP712MessageRaw, signMessageRaw, SignType } from './sign';
import { SignatureVerifyBadge } from './SignatureVerifyBadge';
import { withMockAccount } from '../decorators/wagmi';
import { TYPED_DATA } from '@/lib/signature/type-data';
import { EIP712Domain, TypedData } from 'micro-eth-signer/typed-data';
import { useMemo } from 'react';
import { ScrollableCodeBlock } from '@/components/ScrollableCodeBlock';
import type { Address } from 'viem';



export type VerifySignatureParams = {
    address: Address,
    message: any,
    signature: Hex;
}



const { types, primaryType, domain } = TYPED_DATA;

// for now couple everything and encapsulate to this hook
// end goal refactor for standalone code example for each story 
const useSign = (
    {
        signType,
        privateKey,
        messageAtom,
    }: {
        signType: SignType,
        privateKey: Hex,
        messageAtom: ReturnType<typeof atom<string>>,
    }
): any => {


    const [message,] = useAtom(messageAtom);

    const typedData = useMemo(() => {

        const messageToVerify = {
            ...TYPED_DATA.message,
            contents: message
        }

        const typedData = {
            types,
            primaryType,
            domain: domain as unknown as EIP712Domain,
            message: messageToVerify
        }
        return typedData
    }, [signType, message]);



    if (signType === SignType.EIP191) {
        return {
            messageToVerify: message,
            signMessage: async (message: string) => signMessageRaw(privateKey, message),
            verifyMessage: async ({ signature, message, address }: VerifySignatureParams) => {
                return typed.personal.verify(signature, message, address);
            }
        }
    }

    return {
        messageToVerify: typedData,
        signMessage: (message: string) => signEIP712MessageRaw(privateKey, typedData),
        verifyMessage: async ({ signature, message, address }: VerifySignatureParams) => {
            return typed.verifyTyped(signature, message, address)
        }
    }



}

const SignatureFormMinimal = ({
    privateKey,
    signType = SignType.EIP191,
    messageAtom,
    signatureAtom
}: {
    privateKey: Hex,
    signType: SignType,
    messageAtom: ReturnType<typeof atom<string>>,
    signatureAtom: ReturnType<typeof atom<Hex>>,
}) => {

    const publicKeyAddress = addr.fromPrivateKey(privateKey) as Hex;

    const [signature,] = useAtom(signatureAtom);


    const { signMessage, verifyMessage, messageToVerify } = useSign({
        privateKey,
        signType,
        messageAtom,
    })

    return (
        <div className="flex flex-row">
            <div className="w-1/2">
                {signType}
                <SignatureForm
                    messageAtom={messageAtom}
                    signatureAtom={signatureAtom}
                    signMessage={async (message: string) => {
                        return signMessage(message);
                    }} />

                <SignatureVerifyBadge
                    address={publicKeyAddress}
                    message={messageToVerify}
                    signature={signature}
                    verify={async (
                        { signature, message, address }
                    ) => verifyMessage({ signature, message, address })}
                />
            </div>
            <div>
                {signType === SignType.EIP712 && (
                    <div>
                        <ScrollableCodeBlock
                            title="Message"
                            codeObject={messageToVerify.message} />
                        <ScrollableCodeBlock
                            title="Domain & Types"
                            codeObject={{ domain, types }} />
                    </div>
                )}
            </div>
        </div>
    );
};


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Signature/SignatureFormMinimal',
    component: SignatureFormMinimal,

    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof SignatureFormMinimal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args


export const Minimal: Story = {
    // TODO ignore updated type from decorator
    // @ts-ignore
    args: {
        signType: SignType.EIP191,
        messageAtom: atom(''),
        signatureAtom: atom('' as Hex)
    },
    decorators: [
        withMockAccount(),
    ]
};


export const EIP712Minimal: Story = {
    // @ts-ignore
    args: {
        signType: SignType.EIP712,
        messageAtom: atom(''),
        signatureAtom: atom('' as Hex)
    },
    decorators: [
        withMockAccount(),
    ]
};
