import {
	SCHEMA_FIXTURE_IS_A_FRIEND,
} from "@/lib/eas/eas-test.fixture";
import {
	OffchainAttestationTypedData,
	OffchainAttestationVersion,
} from "@/lib/eas/offchain/offchain";
import { NO_EXPIRATION } from "@/lib/eas/request";
import { signOffchainAttestation } from "@/lib/eas/viem/offchain";
import { AttestationRequestData, makeOnchainAttestation } from "@/lib/eas/viem/onchain";
import type { Meta, StoryObj } from "@storybook/react";
import { encodeBytes32String } from "ethers";
import {
	http,
	Account,
	Address,
	Hex,
	createWalletClient,
	stringToBytes,
	stringToHex,
	Chain,
} from "viem";
import { sepolia } from "viem/chains";
import { withToaster } from "../decorators/toaster";
import { withMockAccount, withWagmiProvider } from "../decorators/wagmi";
import { withWalletControlWagmi } from "../decorators/wallet-control";
import { AttestationForm } from "./AttestationForm";
import { ZERO_BYTES32 } from "@/lib/eas/eas";

type UseAttestationWagmiParams = {
	account: Account,
	chain: Chain,
	isOffchain: boolean,
	schemaId: string,
}



// export type SignAttestationRequestParams = {
// 	recipient: Address;
// 	schemaId: string,
// 	refUID: Hex;
// 	revocable: boolean;
// 	time: bigint;
// 	revocationTime: bigint;
// 	data: string;
// 	value: bigint;
// }

const useAttestationWagmi = (params: UseAttestationWagmiParams) => {

	const { account, chain, isOffchain, schemaId } = params;
	const client = createWalletClient({
		chain,
		transport: http(),
		account,
	});

	const signAttestation = async (requestParams: AttestationRequestData) => {
		console.log("signing onchain attestation");

		const request = {
			schema: schemaId,
			expirationTime: NO_EXPIRATION,
			...requestParams
		};

		if (isOffchain) {
			console.log("signing offchain attestation");

			const version = OffchainAttestationVersion.Version2;


			const salt = stringToHex("SALT", { size: 32 }) as Hex;

			const attestation = await signOffchainAttestation(
				{
					revocable: false,
					refUID: ZERO_BYTES32,
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
	requestData
}: {
	schemaId: string;
	schemaIndex: string;
	isOffchain: boolean;
	chain: Chain;
	account?: Account;
	requestData: Omit<AttestationRequestData, 'recipient'>
}) => {
	if (!account) {
		return;
	}

	const { signAttestation } = useAttestationWagmi({
		account, isOffchain, schemaId, chain,
	});

	const recipient = "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165" as Address;


	return (
		<AttestationForm
			chainId={chain.id}
			schemaId={schemaId}
			schemaIndex={schemaIndex}
			isOffchain={isOffchain}
			signAttestation={async () => signAttestation({
				...requestData,
				recipient,
				// attester: account.address,
			})}
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
	refUID: ZERO_BYTES32,
	time: 1728637333n,
	// revocationTime: 0n,
	// recipient,
	// attester: account.address,
	revocable: true,
	// "yes"
	data: "0x0000000000000000000000000000000000000000000000000000000000000001" as Hex,
	value: 0n,
};


// TODO chain control at withWalletControlWagmi

export const AttestationWagmiOffchain: Story = {
	args: {
		schemaId: SCHEMA_FIXTURE_IS_A_FRIEND.schemaUID,
		schemaIndex: '1',
		chain: sepolia,
		isOffchain: true,
		requestData: requestDataFixture
	}
};

export const AttestationWagmiOnchain: Story = {
	args: {
		schemaId: SCHEMA_FIXTURE_IS_A_FRIEND.schemaUID,
		schemaIndex: '1',
		chain: sepolia,
		isOffchain: false,
		requestData: requestDataFixture
	}
};
