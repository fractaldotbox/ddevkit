import { AttestationForm } from "@repo/ui-react/components/attestations/attestation-form.js";
import { SCHEMA_FIXTURE_IS_A_FRIEND } from "@repo/ui-react/lib/eas/attest.fixture";
import { OffchainAttestationVersion } from "@repo/ui-react/lib/eas/offchain/offchain";
import { NO_EXPIRATION } from "@repo/ui-react/lib/eas/request";
import { signOffchainAttestation } from "@repo/ui-react/lib/eas/viem/offchain";
import {
	AttestationRequestData,
	makeOnchainAttestation,
} from "@repo/ui-react/lib/eas/viem/onchain";
import { createTestClientConfig } from "@repo/ui-react/lib/test-utils-isomorphic";
import type { Meta, StoryObj } from "@storybook/react";
import {
	Account,
	Address,
	Chain,
	Hex,
	createWalletClient,
	stringToHex,
	zeroHash,
} from "viem";
import { sepolia } from "viem/chains";
import { withToaster } from "../decorators/toaster";
import { withMockAccount, withWagmiProvider } from "../decorators/wagmi";
import { withWalletControlWagmi } from "../decorators/wallet-control";

export type UseAttestationWagmiParams = {
	account: Account;
	chain: Chain;
	isOffchain: boolean;
	schemaId: string;
};

const useAttestationWagmi = (params: UseAttestationWagmiParams) => {
	const { account, chain, isOffchain, schemaId } = params;
	const client = createWalletClient({
		...createTestClientConfig(),
		account,
	});

	const signAttestation = async (requestParams: AttestationRequestData) => {
		console.log("signing onchain attestation");

		const request = {
			schema: schemaId,
			expirationTime: NO_EXPIRATION,
			...requestParams,
		};

		if (isOffchain) {
			console.log("signing offchain attestation");

			const version = OffchainAttestationVersion.Version2;

			const salt = stringToHex("SALT", { size: 32 }) as Hex;

			const attestation = await signOffchainAttestation(
				{
					revocable: false,
					refUID: zeroHash,
					...request,

					version,
					salt,
				},
				{
					chain,
					account,
				},
			);

			console.log("offchain created", attestation);
			const { uid } = attestation;
			return {
				uids: [uid],
			};
		}

		const { uids, txnReceipt } = await makeOnchainAttestation(client, {
			schema: schemaId,
			data: request,
		});

		console.log("uids", uids, txnReceipt);
		return {
			uids,
			txnReceipt,
		};
	};
	return {
		signAttestation,
	};
};

const AttestationFormWagmi = ({
	schemaId,
	schemaIndex,
	isOffchain,
	account,
	chain,
	requestData,
}: {
	schemaId: string;
	schemaIndex: string;
	isOffchain: boolean;
	chain: Chain;
	account?: Account;
	requestData: Omit<AttestationRequestData, "recipient">;
}) => {
	if (!account) {
		return;
	}

	const { signAttestation } = useAttestationWagmi({
		account,
		isOffchain,
		schemaId,
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
					...requestData,
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

const requestDataFixture = {
	refUID: zeroHash,
	time: 1728637333n,
	revocable: true,
	// "yes"
	data: "0x0000000000000000000000000000000000000000000000000000000000000001" as Hex,
	value: 0n,
};

// TODO chain control at withWalletControlWagmi

export const AttestationWagmiOffchain: Story = {
	args: {
		schemaId: SCHEMA_FIXTURE_IS_A_FRIEND.schemaUID,
		schemaIndex: "9",
		chain: sepolia,
		isOffchain: true,
		requestData: requestDataFixture,
	},
};

export const AttestationWagmiOnchain: Story = {
	args: {
		schemaId: SCHEMA_FIXTURE_IS_A_FRIEND.schemaUID,
		schemaIndex: "9",
		chain: sepolia,
		isOffchain: false,
		requestData: requestDataFixture,
	},
};
