import { EAS_CONTRACT_ADDRESS } from "@/lib/eas/abi";
import {
	VOTE_SCHEMA_FIXTURE,
	ZERO_BYTES,
	ZERO_BYTES32,
} from "@/lib/eas/eas-test.fixture";
import { createAttestationOnchain, createEAS } from "@/lib/eas/ethers/onchain";
import { NO_EXPIRATION } from "@/lib/eas/request";
import { BY_USER } from "@repo/domain/user.fixture";
import { AttestationForm } from "@repo/ui-react/components/attestations/attestation-form.js";
import { createTestEthersSigner } from "@repo/ui-react/lib/test-utils-isomorphic";
import type { Meta, StoryObj } from "@storybook/react";
import { encodeBytes32String } from "ethers";
import { Address, Hex } from "viem";
import { withToaster } from "../decorators/toaster";
import { withWalletControl } from "../decorators/wallet-control";

const requestTemplate = {
	recipient: BY_USER.eas.mockReceipient.address,
	expirationTime: NO_EXPIRATION,
	revocable: true,
	refUID: ZERO_BYTES32,
	data: ZERO_BYTES as Hex,
	salt: encodeBytes32String("SALT") as Hex,
};

const AttestationFormEasSdk = ({
	privateKey,
	schemaId,
	schemaIndex,
	isOffchain,
}: any) => {
	const signer = createTestEthersSigner(privateKey, 11155111);

	const eas = createEAS(EAS_CONTRACT_ADDRESS, signer);

	return (
		<AttestationForm
			chainId={11155111}
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

export const Onchain: Story = {
	args: {
		privateKey: BY_USER.mock.privateKey,
		schemaId: VOTE_SCHEMA_FIXTURE.schemaUID,
		schemaIndex: "9",
		isOffchain: false,
	},
	decorators: [],
};

export const Offchain: Story = {
	args: {
		privateKey: BY_USER.mock.privateKey,
		schemaId: VOTE_SCHEMA_FIXTURE.schemaUID,
		schemaIndex: "9",
		isOffchain: true,
	},
	decorators: [],
};
