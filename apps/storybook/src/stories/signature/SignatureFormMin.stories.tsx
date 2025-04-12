import { type Hex, SignType } from "@geist/domain/signature/sign";
import { TYPED_DATA } from "@geist/domain/signature/type-data";
import { SignatureFormMinimal } from "@geist/ui-react/components/signature/signature-form-min";
import type { Meta, StoryObj } from "@storybook/react";
import type { StoryContext } from "@storybook/react";
import { expect, userEvent } from "@storybook/test";
import { map } from "nanostores";
import { withMockAccount } from "../decorators/wagmi";
import { setupCanvas } from "../utils/test-utils";

/**
 * Helper function to test the signature form UI interactions
 *
 * @param canvasElement The canvas element to test
 * @param options Additional test options
 * @returns Promise that resolves when the test is complete
 */
const testSignatureFormUI = async (
	canvasElement: HTMLElement,
	options: {
		message?: string;
		waitTime?: number;
		checkTypedData?: boolean;
	} = {},
) => {
	const {
		message = "hello world",
		waitTime = 2000,
		checkTypedData = false,
	} = options;

	const { canvas } = await setupCanvas(canvasElement, waitTime);

	const messageInput = await canvas.findByRole("textbox");
	expect(messageInput).toBeInTheDocument();

	const signButton = await canvas.findByRole("button", {
		name: /Sign Message/i,
	});
	expect(signButton).toBeInTheDocument();

	await userEvent.type(messageInput, message);
	await userEvent.click(signButton);

	await new Promise((resolve) => setTimeout(resolve, waitTime));

	const verificationBadge = await canvas.findByText(/Verified!/i);
	expect(verificationBadge).toBeInTheDocument();

	const signatureText = await canvas.findByText(/Signature:/);
	expect(signatureText).toBeInTheDocument();

	if (checkTypedData) {
		const messageContent = await canvas.findByText(
			new RegExp(`"contents": "${message}"`, "i"),
		);
		expect(messageContent).toBeInTheDocument();
	}
};

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
	play: async ({ canvasElement }) => {
		await testSignatureFormUI(canvasElement);
	},
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
	play: async ({ canvasElement }) => {
		await testSignatureFormUI(canvasElement, { checkTypedData: true });
	},
};
