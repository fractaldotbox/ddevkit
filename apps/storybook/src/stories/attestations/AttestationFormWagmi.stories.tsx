import { AttestationFormWagmi } from "@geist/ui-react/components/attestations/attestation-form-wagmi";
import { SCHEMA_BY_NAME } from "@geist/ui-react/lib/eas/attest.fixture";
import type { Meta, StoryObj } from "@storybook/react";
import { type Chain, type Hex, stringToHex, zeroHash } from "viem";
import { sepolia } from "viem/chains";
import { withSonner } from "../decorators/toaster";
import { withMockAccount, withWagmiProvider } from "../decorators/wagmi";
import { withWalletControlWagmi } from "../decorators/wallet-control";

const meta = {
	title: "Attestations/AttestationFormWagmi",
	component: AttestationFormWagmi,
	parameters: {
		layout: "centered",
	},
	decorators: [
		withSonner(),
		withWalletControlWagmi(),
		withMockAccount(),
		withWagmiProvider(),
	],
	args: {},
	tags: ["!autodocs", "experimental"],
} satisfies Meta<typeof AttestationFormWagmi>;

export default meta;
type Story = StoryObj<typeof meta>;

const createArgs = (schema: any, chain: Chain, fixture: any) => {
	const { schemaString } = schema;
	const { uid, index } = schema.byChain[chain.id];
	const { data, attestData } = fixture;

	return {
		chain,
		chainId: chain.id,
		schemaId: uid,
		schemaIndex: index.toString(),
		schemaString,
		data,
		attestData: {
			refUID: zeroHash,
			time: 1728637333n,
			revocable: true,
			value: 0n,
			salt: stringToHex("SALT", { size: 32 }) as Hex,
			...attestData,
		},
	};
};

// TODO chain control at withWalletControlWagmi

export const AttestationWagmiOffchain: Story = {
	args: {
		isOffchain: true,
		...createArgs(
			SCHEMA_BY_NAME.IS_A_FRIEND,
			sepolia,
			SCHEMA_BY_NAME.IS_A_FRIEND.byFixture.isFriend,
		),
	},
};

export const AttestationWagmiOnchain: Story = {
	args: {
		isOffchain: false,
		...createArgs(
			SCHEMA_BY_NAME.IS_A_FRIEND,
			sepolia,
			SCHEMA_BY_NAME.IS_A_FRIEND.byFixture.isFriend,
		),
	},
};
