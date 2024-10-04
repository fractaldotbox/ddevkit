import type { Meta, StoryObj } from '@storybook/react';
import { addr } from 'micro-eth-signer';
import { atom, useAtom } from 'jotai'

import * as typed from 'micro-eth-signer/typed-data';
import { SignatureForm } from './SignatureForm';
import { Hex, signMessageRaw } from './sign';
import { getRandomAccount } from '../fixture';
import { SignatureVerifyBadge } from './SignatureVerifyBadge';
import { withMockAccount } from '../decorators/wagmi';




const messageAtom = atom('')
const signatureAtom = atom('' as Hex)

const SignatureFormMinimal = ({
    privateKey
}: {
    privateKey: Hex
}) => {

    const publicKeyAddress = addr.fromPrivateKey(privateKey) as Hex;

    const [message,] = useAtom(messageAtom);
    const [signature,] = useAtom(signatureAtom);


    // TODO hex message
    return (
        <div>
            <SignatureForm
                messageAtom={messageAtom}
                signatureAtom={signatureAtom}
                signMessage={async (message: string) => {
                    return signMessageRaw(privateKey, message);
                }} />
            <SignatureVerifyBadge
                address={publicKeyAddress}
                message={message}
                signature={signature}
                verify={async (...args) => typed.personal.verify(...args)}
            />
        </div>
    );
};



// const isValid = secp.verify(signature, msgHash, pubKey);
// const signature = '';

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

    },
    decorators: [
        withMockAccount(),
    ]
};
