import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { Avatar } from './Avatar';

const meta = {
    title: 'Identity/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        address: faker.finance.ethereumAddress(),
    },
};