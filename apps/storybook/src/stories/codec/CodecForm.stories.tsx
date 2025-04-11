import { CodecForm } from "@geist/ui-react/components/codec/CodecForm";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { setupCanvas } from "../utils/test-utils";

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

async function testCodecForm(canvasElement: any, expectedTexts: string[]) {
	const { canvas } = await setupCanvas(canvasElement, 0);
	const input = await canvas.getByRole("textbox");
	await expect(input).toBeVisible();
	await userEvent.type(input, "123abc");
	await new Promise((resolve) => setTimeout(resolve, 1000));
	await expect(canvas.getByText('{"message":"123abc"}')).toBeVisible();
	await expect(canvas.getByText("codec: cid")).toBeVisible();
	expectedTexts.forEach(async (text) => {
		await expect(canvas.getByText(text)).toBeVisible();
	});
}

export const Multibase64: Story = {
	args: {
		$codec: map({
			input: "",
			codec: "multibase64",
		}),
	},
	play: async ({ canvasElement }) => {
		await testCodecForm(canvasElement, [
			"bagaaieramt5v6v252z63hzr2l7f37gwznp7s5ialbtvasyfno4iz3sbjkstq",
			"codec: multibase64",
			"mAYAEEiBk+19XXdZ9s+Y6X8u/mtlr/y6gCwzqCWCtdxGdyClUpw",
			"codec: base64",
			"AYAEEiCcptlVPp19Q9ncKA2+CSUrhHCKGAlJrVnYuV0NVfUE4w==",
		]);
	},
};

export const Multibase16: Story = {
	args: {
		$codec: map({
			input: "",
			codec: "multibase16",
		}),
	},
	play: async ({ canvasElement }) => {
		await testCodecForm(canvasElement, [
			"bagaaieramt5v6v252z63hzr2l7f37gwznp7s5ialbtvasyfno4iz3sbjkstq",
			"codec: multibase16",
			"f018004122064fb5f575dd67db3e63a5fcbbf9ad96bff2ea00b0cea0960ad77119dc82954a7",
			"codec: base16",
			"01800412209CA6D9553E9D7D43D9DC280DBE09252B84708A180949AD59D8B95D0D55F504E3",
		]);
	},
};

// TODO CID
// with explorer https://cid.ipfs.tech/#bagbaieralcueppbj7cpxhlsfuokxatqzqdutb47mgs44myg7dsmktsb34zxa
