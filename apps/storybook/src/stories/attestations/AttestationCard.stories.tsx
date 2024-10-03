import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { AttestationCard } from './AttestationCard';
import { Address, Hex } from 'viem';
import { withWagmiProvider } from '../decorators/wagmi';
import { BY_USER } from '../fixture';

const meta = {
    title: 'Attestations/AttestationCard',
    component: AttestationCard,
    parameters: {
        layout: 'centered',
    },
    args: {},
    decorators: [
        withWagmiProvider()
    ]
} satisfies Meta<typeof AttestationCard>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Exists: Story = {
    args: {
        attesterAddress: BY_USER.easSampleAttester.address,
    },
};


