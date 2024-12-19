import { BY_USER } from "@repo/domain/user.fixture";
import { AttestationForm } from "@repo/ui-react/components/attestations/attestation-form.js";
import { ZERO_BYTES } from "@repo/ui-react/lib/constants";
import { EAS_CONTRACT_ADDRESS } from "@repo/ui-react/lib/eas/abi";
import {
	SCHEMA_BY_NAME,
	VOTE_SCHEMA_FIXTURE,
} from "@repo/ui-react/lib/eas/attest.fixture";
import { NO_EXPIRATION } from "@repo/ui-react/lib/eas/request";
import {
	createAttestationOnchain,
	createEAS,
} from "@repo/ui-react/lib/eas/sdk/eas";
import { createTestEthersSigner } from "@repo/ui-react/lib/test-utils-isomorphic";
import type { Meta, StoryObj } from "@storybook/react";
import { encodeBytes32String } from "ethers";
import { Address, Hex, zeroHash } from "viem";
import { mainnet, optimism, sepolia } from "viem/chains";
import { withToaster } from "../decorators/toaster";
import { withWalletControl } from "../decorators/wallet-control";

const requestTemplate = {
	recipient: BY_USER.eas.mockReceipient.address,
	expirationTime: NO_EXPIRATION,
	revocable: true,
	refUID: zeroHash,
	data: ZERO_BYTES as Hex,
	salt: encodeBytes32String("SALT") as Hex,
};

export interface AttestationFormEasSdkProps {
	privateKey: string;
	chainId: number;
	schemaId: string;
	schemaIndex: string;
	isOffchain: boolean;
}

const AttestationFormEasSdk = ({
	privateKey,
	chainId,
	schemaId,
	schemaIndex,
	isOffchain,
}: AttestationFormEasSdkProps) => {
	const signer = createTestEthersSigner(privateKey, 11155111);

	const eas = createEAS(EAS_CONTRACT_ADDRESS, signer);

	return (
		<AttestationForm
			chainId={chainId}
			schemaId={schemaId}
			schemaIndex={schemaIndex}
			isOffchain={isOffchain}
			signAttestation={async (): Promise<any> => {
				// TODO fix encode data structure
				const now = BigInt(Date.now());

				const { recipient, revocable, expirationTime, refUID, data, salt } =
					requestTemplate;

				if (isOffchain) {
					console.log("create offchain attestation");

					const offchain = await eas.getOffchain();

					const attesterAddress = (await signer.getAddress()) as Address;

					const attestation = await offchain.signOffchainAttestation(
						{
							schema: schemaId,
							recipient,
							time: now,
							expirationTime,
							revocable,
							refUID,
							data,
							salt,
						},
						signer,
					);

					const { uid } = attestation;
					return {
						uids: [uid],
					};
				}
				return createAttestationOnchain({
					eas,
					schemaString: VOTE_SCHEMA_FIXTURE.schemaString,
					encodedDataParams: VOTE_SCHEMA_FIXTURE.encodedData,
					schemaUID: schemaId,
					attestationData: {},
				});
			}}
		/>
	);
};

const meta = {
	title: "Attestations/AttestationFormEasSdk",
	component: AttestationFormEasSdk,
	parameters: {
		layout: "centered",
	},
	decorators: [withToaster(), withWalletControl()],
	args: {},
} satisfies Meta<typeof AttestationFormEasSdk>;

export default meta;
type Story = StoryObj<typeof meta>;

const createArgs = (schema: any, chainId: number) => {
	return {
		chainId: chainId,
		privateKey: BY_USER.mock.privateKey,
		schemaId: schema.byChain[chainId].uid,
		schemaIndex: schema.byChain[chainId].index.toString(),
	};
};

export const Onchain: Story = {
	args: {
		isOffchain: false,
		...createArgs(SCHEMA_BY_NAME.VOTE, mainnet.id),
	},
	decorators: [],
};

export const OnchainOptimism: Story = {
	args: {
		...Onchain.args,
		...createArgs(SCHEMA_BY_NAME.IS_A_FRIEND, optimism.id),
	},
	decorators: [],
};

export const Offchain: Story = {
	args: {
		isOffchain: true,
		...createArgs(SCHEMA_BY_NAME.IS_A_FRIEND, sepolia.id),
	},
	decorators: [],
};

export const OffchainVote: Story = {
	args: {
		isOffchain: true,
		...createArgs(SCHEMA_BY_NAME.VOTE, sepolia.id),
	},
	decorators: [],
};
