import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { withQueryClientProvider, withWagmiProvider } from '../decorators/wagmi';
import { BY_USER } from '../fixture';
import { AvatarWagmi } from './AvatarWagmi';


const meta = {
    title: 'Identity/Avatar/Avatar',
    component: Avatar,
    args: {},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ens: Story = {
    args: {
        addressOrEns: BY_USER.vitalik.ens

    },
    decorators: [withQueryClientProvider()],
};

export const Address: Story = {
    args: {
        addressOrEns: BY_USER.vitalik.address

    },
    decorators: [withQueryClientProvider()],
};
