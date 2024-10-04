import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { atom, useAtom } from 'jotai'

import { withMockAccount, withWagmiProvider } from '../decorators/wagmi';
import * as secp from '@noble/secp256k1';
import { useAccount, useSignMessage, useVerifyMessage, useWalletClient } from 'wagmi';
import { SignatureForm } from './SignatureForm';
import { Hex } from './sign';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Flex } from '@radix-ui/themes';
import { SignatureVerifyBadge } from './SignatureVerifyBadge';
import { Account, verifyMessage } from 'viem';


const messageAtom = atom('')
const signatureAtom = atom('' as Hex);


const SignatureFormWagmi = ({
    account
}: {
    account?: Account
}) => {
    const { signMessageAsync } = useSignMessage();

    const [message,] = useAtom(messageAtom);
    const [signature,] = useAtom(signatureAtom);

    // TODO hex message
    return (
        <div>
            <SignatureForm
                messageAtom={messageAtom}
                signatureAtom={signatureAtom}
                signMessage={async (message: Hex) => {
                    return await signMessageAsync({
                        account,
                        message
                    })
                }} />
            {
                account?.address && (
                    <SignatureVerifyBadge
                        address={account.address!}
                        message={message} signature={signature}
                        verify={() => verifyMessage({
                            address: account.address!,
                            message,
                            signature,
                        })}

                    />
                )
            }

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
        withMockAccount(),
        withWagmiProvider(),

    ]
};





