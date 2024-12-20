import { AttestationForm } from "@repo/ui-react/components/attestations/attestation-form";
import { useAttestation } from "@repo/ui-react/hooks/eas/use-attestation";
import {
	SCHEMA_BY_NAME,
	SCHEMA_FIXTURE_IS_A_FRIEND,
} from "@repo/ui-react/lib/eas/attest.fixture";
import { AttestationRequestData } from "@repo/ui-react/lib/eas/viem/onchain";
import type { Meta, StoryObj } from "@storybook/react";
import { Account, Address, Chain, Hex, stringToHex, zeroHash } from "viem";
import { sepolia } from "viem/chains";
import { withToaster } from "../decorators/toaster";
import { withMockAccount, withWagmiProvider } from "../decorators/wagmi";
import { withWalletControlWagmi } from "../decorators/wallet-control";

const AttestationFormWagmi = ({
	schemaId,
	schemaIndex,

	account,
	isOffchain,
	schemaString,
	chain,
	data,
	attestData,
}: {
	schemaId: string;
	schemaIndex: string;
	account: Account;
	isOffchain: boolean;
	schemaString: string;
	chain: Chain;
	data: any;
	attestData: Omit<AttestationRequestData, "recipient">;
}) => {
	if (!account) {
		return;
	}

	console.log("schemaString", schemaString);

	const { signAttestation } = useAttestation({
		account,
		isOffchain,
		schemaId,
		schemaString,
		chain,
	});

	const recipient = "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165" as Address;

	return (
		<AttestationForm
			chainId={chain.id}
			schemaId={schemaId}
			schemaIndex={schemaIndex}
			isOffchain={isOffchain}
			signAttestation={async () =>
				signAttestation({
					...attestData,
					data,
					recipient,
					// attester: account.address,
				})
			}
		/>
	);
};

const meta = {
	title: "Attestations/AttestationFormWagmi",
	component: AttestationFormWagmi,
	parameters: {
		layout: "centered",
	},
	decorators: [
		withToaster(),
		withWalletControlWagmi(),
		withMockAccount(),
		withWagmiProvider(),
	],
	args: {},
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
