import type { Meta, StoryObj } from '@storybook/react';

import { UploadForm } from './upload-form';

const meta = {
    title: 'Filecoin/UploadForm',
    component: UploadForm,
    argTypes: {
    },
    args: {},
} satisfies Meta<typeof UploadForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {

    },
};