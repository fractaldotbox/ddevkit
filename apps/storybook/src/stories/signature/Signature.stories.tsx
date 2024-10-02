import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { atom, useAtom } from 'jotai'

import { withWagmiProvider } from '../decorators/wagmi';
import * as secp from '@noble/secp256k1';
import { useAccount, useVerifyMessage, useWalletClient } from 'wagmi';
import { SignatureForm } from './SignatureForm';
import { Hex, Message } from './sign';
import { Checkbox, Flex } from '@radix-ui/themes';
import { useState } from 'react';



const SignatureVerifyBadge = ({ address, message, signature }: {
    address: Hex,
    message: string,
    signature: string
}) => {
    const { data: results } = useVerifyMessage({
        address
    });

    const isVerified = false;

    console.log('results', results)

    return (
        <div>
            {/* <div className="flex items-center space-x-2">
                <div id="public-key">
                    <Address address={publicKeyAddress} />
                </div>
                <Label htmlFor="public-key">Public Key</Label>
            </div> */}

            <Flex align="center" gap="2">
                <Checkbox size="1" checked={isVerified} />
                Verified!
            </Flex>
            <div>Signature: {signature}</div>
            <div>Message: </div>
        </div>
    );

}

const messageAtom = atom('')
const signatureAtom = atom('')


const SignatureFormWagmi = () => {
    const { data: client } = useWalletClient();
    const account = useAccount();

    const [message,] = useAtom(messageAtom);
    const [signature,] = useAtom(signatureAtom);

    // TODO hex message
    return (
        <div>
            Account {account.address}
            <SignatureForm
                messageAtom={messageAtom}
                signatureAtom={signatureAtom}
                signMessage={async (message: Message) => {
                    console.log('client', client)
                    if (!client) {
                        return;
                    }
                    return await client.signMessage({
                        message
                    })
                }} />
            <SignatureVerifyBadge
                address={account.address!}
                message={message} signature={signature} />
        </div>
    );
};



const meta = {
    title: 'Signature/SignatureForm',
    component: SignatureFormWagmi,

    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof SignatureFormWagmi>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Wagmi: Story = {
    args: {
    },
    decorators: [
        withWagmiProvider()
    ]
};





