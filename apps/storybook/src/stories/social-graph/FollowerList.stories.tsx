import type { Meta, StoryObj } from '@storybook/react';

import { Hex } from 'viem';
import { FollowerListEnsjs } from './FollowerListEnsjs';
import { BY_USER } from '../fixture';
import { withQueryClientProvider } from '../decorators/wagmi';


const meta = {
    title: 'SocialGraph/FollowerListEnsjs',
    component: FollowerListEnsjs,
    parameters: {
        layout: 'centered',
    },
    args: {},
} satisfies Meta<typeof FollowerListEnsjs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ensjs: Story = {
    args: {
        addressOrEns: BY_USER.vitalik.address
    },
    decorators: [
        withQueryClientProvider()
    ]
};
