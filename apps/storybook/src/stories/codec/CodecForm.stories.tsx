import { CodecForm } from "@geist/ui-react/components/codec/CodecForm";
import type { Meta, StoryObj } from "@storybook/react";

import { map } from "nanostores";

const meta = {
	title: "Codec/Multibase",
	component: CodecForm,
	parameters: {
		layout: "centered",
	},
	argTypes: {},
	args: {},
	decorators: [],
} satisfies Meta<typeof CodecForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Multibase64: Story = {
	args: {
		$codec: map({
			input: "",
			codec: "multibase64",
		}),
	},
};

export const Multibase16: Story = {
	args: {
		$codec: map({
			input: "",
			codec: "multibase16",
		}),
	},
};

// TODO CID
// with explorer https://cid.ipfs.tech/#bagbaieralcueppbj7cpxhlsfuokxatqzqdutb47mgs44myg7dsmktsb34zxa
