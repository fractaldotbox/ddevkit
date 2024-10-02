import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { Hex } from 'viem';
import { Name } from './Name';
import { Address } from './Address';

const meta = {
    title: 'Identity/Name',
    component: Name,
    parameters: {
        layout: 'centered',
    },
    args: {},
} satisfies Meta<typeof Address>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Short: Story = {
    args: {
        address: faker.finance.ethereumAddress() as Hex,
    },
};
