import { BY_USER } from "@repo/domain/user.fixture";
import { AttestationForm } from "@repo/ui-react/components/attestations/attestation-form.js";
import { useAttestationEasSdk } from "@repo/ui-react/hooks/eas/sdk/use-attestation.js";
import { ZERO_BYTES } from "@repo/ui-react/lib/constants";
import { EAS_CONTRACT_ADDRESS } from "@repo/ui-react/lib/eas/abi";
import { SCHEMA_BY_NAME } from "@repo/ui-react/lib/eas/attest.fixture";
import { NO_EXPIRATION } from "@repo/ui-react/lib/eas/request";
import { SchemaItem, createEAS } from "@repo/ui-react/lib/eas/sdk/eas";
import { createTestEthersSigner } from "@repo/ui-react/lib/test-utils-isomorphic";
import type { Meta, StoryObj } from "@storybook/react";
import { encodeBytes32String } from "ethers";
import { Hex, zeroHash } from "viem";
import { mainnet, optimism, sepolia } from "viem/chains";
import { withToaster } from "../decorators/toaster";
import { withWalletControl } from "../decorators/wallet-control";

export interface AttestationFormEasSdkProps {
	privateKey: string;
	chainId: number;
	schemaId: string;
	schemaIndex: string;
	schemaString: string;
	data: SchemaItem[];
	isOffchain: boolean;
}

const AttestationFormEasSdk = ({
	privateKey,
	chainId,
	schemaId,
	schemaIndex,
	schemaString,
	data,
	isOffchain,
}: AttestationFormEasSdkProps) => {
	const signer = createTestEthersSigner(privateKey, 11155111);

	const eas = createEAS(EAS_CONTRACT_ADDRESS, signer);

	const { signAttestation } = useAttestationEasSdk({
		schemaId,
		schemaString,
		signer,
		chain: mainnet,
		isOffchain,
	});

	const requestTemplate = {
		recipient: BY_USER.eas.mockReceipient.address,
		expirationTime: NO_EXPIRATION,
		revocable: true,
		refUID: zeroHash,
		data,
		salt: encodeBytes32String("SALT") as Hex,
	};

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

				return signAttestation({
					...requestTemplate,
					recipient,
					data,
					time: now,
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

const createArgs = (schema: any, chain: Chain, fixture: any) => {
	const { schemaString, byChain } = schema;
	const { uid, index } = byChain[chain.id];
	const { data, attestData } = fixture;
	return {
		chainId: chain.id,
		privateKey: BY_USER.mock.privateKey,
		schemaId: uid,
		schemaIndex: index.toString(),
		schemaString,
		data,
		attestData,
	};
};

export const Onchain: Story = {
	args: {
		isOffchain: false,
		// ...createArgs(SCHEMA_BY_NAME.VOTE, mainnet.id),
		// ...SCHEMA_BY_NAME.VOTE.byFixture.vote,
		...createArgs(
			SCHEMA_BY_NAME.IS_A_FRIEND,
			optimism,
			SCHEMA_BY_NAME.IS_A_FRIEND.byFixture.isFriend,
		),
	},
	decorators: [],
};

export const OnchainOptimism: Story = {
	args: {
		isOffchain: false,
		...createArgs(
			SCHEMA_BY_NAME.IS_A_FRIEND,
			optimism,
			SCHEMA_BY_NAME.IS_A_FRIEND.byFixture.isFriend,
		),
	},
	decorators: [],
};

export const Offchain: Story = {
	args: {
		isOffchain: true,
		...createArgs(
			SCHEMA_BY_NAME.IS_A_FRIEND,
			sepolia,
			SCHEMA_BY_NAME.IS_A_FRIEND.byFixture.isFriend,
		),
	},
	decorators: [],
};

// Until dynamic form
// export const OffchainVote: Story = {
// 	args: {
// 		isOffchain: true,
// 		...createArgs(SCHEMA_BY_NAME.VOTE, sepolia.id),
// 		...SCHEMA_BY_NAME.VOTE.byFixture.vote,
// 	},
// 	decorators: [],
// };
