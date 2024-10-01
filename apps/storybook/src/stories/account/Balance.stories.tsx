import type { Meta, StoryObj } from '@storybook/react';

import { Balance } from './Balance';
import { withWagmiProvider } from '../decorators/wagmi';
import { Address } from 'viem';
import { BY_USER } from '../fixture';
import { base, optimism } from 'viem/chains';
import { BY_CHAIN_ID, Token } from '../../utils/config';

const meta = {
    title: 'Account/Balance',
    component: Balance,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
    },
    args: {},
    decorators: [
        withWagmiProvider()
    ]
} satisfies Meta<typeof Balance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainnetETH: Story = {
    args: {
        address: BY_USER.vitalik.address as Address,
    },
};


export const BaseETH: Story = {
    args: {
        address: BY_USER.vitalik.address as Address,
        chainId: base.id,
    },
};



export const OptimismUSDC: Story = {
    args: {
        address: BY_USER.vitalik.address as Address,
        chainId: optimism.id,
        token: BY_CHAIN_ID[optimism.id][Token.USDC]
    },
};

