import type { Meta, StoryObj } from "@storybook/react";

import UploadDropzone from "./upload-dropzone";

const meta = {
	title: "Filecoin/UploadDropzone",
	component: UploadDropzone,
	argTypes: {},
	args: {},
} satisfies Meta<typeof UploadDropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lighthouse: Story = {
	args: {},
};
