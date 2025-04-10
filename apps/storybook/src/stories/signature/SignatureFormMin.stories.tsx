import { type Hex, SignType } from "@geist/domain/signature/sign";
import { TYPED_DATA } from "@geist/domain/signature/type-data";
import { SignatureFormMinimal } from "@geist/ui-react/components/signature/signature-form-min";
import type { Meta, StoryObj } from "@storybook/react";
import { map } from "nanostores";
import { withMockAccount } from "../decorators/wagmi";

const meta = {
	title: "Signature/SignatureFormMinimal",
	component: SignatureFormMinimal,
} satisfies Meta<typeof SignatureFormMinimal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = {
	// @ts-ignore
	args: {
		signType: SignType.EIP191,
		$input: map({
			message: "",
			signature: "" as Hex,
		}),
	},
	decorators: [withMockAccount()],
};

export const EIP712Minimal: Story = {
	// @ts-ignore
	args: {
		signType: SignType.EIP712,
		$input: map({
			message: "",
			signature: "" as Hex,
		}),
	},
	decorators: [withMockAccount()],
};
