import type { Meta, StoryObj } from '@storybook/react';
import { CodecForm } from './CodecForm'
import { atom } from 'jotai';

const meta = {
    title: 'Codec/Multibase',
    component: CodecForm,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
    },
    args: {},
    decorators: [
    ]
} satisfies Meta<typeof CodecForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Multibase64: Story = {
    args: {
        inputAtom: atom(""),
        codecAtom: atom("multibase64"),
    },
};

export const Multibase16: Story = {
    args: {
        inputAtom: atom(""),
        codecAtom: atom("multibase16"),
    },
};

