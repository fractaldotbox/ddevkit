import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { Attestations } from './Attestations';
import { Address, Hex } from 'viem';
import { withWagmiProvider } from '../decorators/wagmi';

const meta = {
    title: 'Attestations/Attestations',
    component: Attestations,
    parameters: {
        layout: 'centered',
    },
    args: {},
    decorators: [
        withWagmiProvider()
    ]
} satisfies Meta<typeof Attestations>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Exists: Story = {
    args: {
        address: '0x1CB34c1eC454708e7C849975E8e545B54417CdFf' as Address,
    },
};


export const None: Story = {
    args: {
        address: faker.finance.ethereumAddress() as Hex,
    },
};

