import type { Meta, StoryObj } from '@storybook/react';
import { addr } from 'micro-eth-signer';
import { atom, useAtom } from 'jotai'

import * as typed from 'micro-eth-signer/typed-data';
import { SignatureForm } from './SignatureForm';
import { Flex } from '@radix-ui/themes';
import { Hex, signMessageRaw } from './sign';
import { Address } from '../identity/Address';
import { Label } from '../../components/ui/label';
import { getRandomAccount } from '../fixture';
import { useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';


const SignatureVerifyBadge = ({ signature, message, address }: {
    signature: Hex,
    message: string,
    address: Hex
}) => {


    const isVerified = useMemo(() => {
        if (!signature || !message || !address) {
            return false;
        }

        return typed.personal.verify(signature, message, address);


    }, [signature, message, address])

    return (
        <div>
            <div className="flex items-center space-x-2">
                <Label htmlFor="public-key">Public Key</Label>
                <div id="public-key">
                    <Address address={address} />
                </div>
            </div>

            <Flex align="center" gap="2">
                <Checkbox checked={isVerified} />
                {isVerified ? 'Verified!' : ''}
            </Flex>
            <div>Signature: </div>
            <div>Message: </div>
        </div>
    );


}

const messageAtom = atom('')
const signatureAtom = atom('' as Hex)

const SignatureFormRaw = ({
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
            />
        </div>
    );
};



// const isValid = secp.verify(signature, msgHash, pubKey);
// const signature = '';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Signature/SignatureFormRaw',
    component: SignatureFormRaw,

    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof SignatureFormRaw>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args


export const Raw: Story = {
    args: {
        privateKey: getRandomAccount().privateKey as Hex // Secure random private key
    },
};
