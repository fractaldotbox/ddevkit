import type { Meta, StoryObj } from '@storybook/react';

import { SocialGraph } from './SocialGraph';
import { BY_USER } from '../fixture';
import { withQueryClientProvider } from '../decorators/wagmi';


const meta = {
    title: 'SocialGraph/SocialGraph',
    component: SocialGraph,
    parameters: {
        layout: 'centered',
    },
    args: {},
} satisfies Meta<typeof SocialGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Graph: Story = {
    args: {
        addressOrEns: BY_USER.vitalik.address
    },
    decorators: [
        withQueryClientProvider()
    ]
};
