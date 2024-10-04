import type { Meta, StoryObj } from '@storybook/react';
import { AttestationFormEasSdk } from './AttestationFormEasSdk';
import { withWagmiProvider } from '../decorators/wagmi';

const meta = {
    title: 'Attestations/AttestationFormEasSdk',
    component: AttestationFormEasSdk,
    parameters: {
        layout: 'centered',
    },
    args: {}
} satisfies Meta<typeof AttestationFormEasSdk>;

export default meta;
type Story = StoryObj<typeof meta>;


// export const EasSdk: Story = {
//     args: {
//         schemaId: '',
//         schemaIndex: '1'
//     },
// };

export const EasSdkWagmi: Story = {
    args: {
        schemaId: '',
        schemaIndex: '1'
    },
    decorators: [
        withWagmiProvider()
    ]
};

