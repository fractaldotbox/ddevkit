import type { Meta, StoryObj } from "@storybook/react";
import { AttestationForm } from "./AttestationForm";
import { withMockAccount, withWagmiProvider } from "../decorators/wagmi";
import {
    SCHEMA_FIXTURE_IS_A_FRIEND,
    ZERO_BYTES32,
} from "@/lib/eas/eas-test.fixture";
import { NO_EXPIRATION } from "@/lib/eas/request";
import { Account, Address, createWalletClient, Hex, http, stringToBytes, stringToHex } from "viem";
import { sepolia } from "viem/chains";
import { makeAttestation } from "@/lib/eas/viem/onchain";
import { withToaster } from "../decorators/toaster";
import { useChainId } from "wagmi";
import { withWalletControlWagmi } from "../decorators/wallet-control";
import { OffchainAttestationTypedData, OffchainAttestationVersion } from "@/lib/eas/offchain/offchain";
import { signOffchainAttestation } from "@/lib/eas/viem/offchain";
import { encodeBytes32String } from "ethers";

const useAttestationWagmi = (account: Account, isOffchain: boolean) => {

    const chain = sepolia;
    const client = createWalletClient({
        chain,
        transport: http(),
        account,
    });

    const signAttestation = async ({
        recipient,
    }: {
        recipient: Address;
    }) => {

        console.log("signing onchain attestation");
        const fixture = {
            schemaId: SCHEMA_FIXTURE_IS_A_FRIEND.schemaUID,
            refUID: ZERO_BYTES32,
            time: 1728637333n,
            revocationTime: 0n,
            recipient,
            attester: account.address,
            revocable: true,
            // "yes"
            data: "0x0000000000000000000000000000000000000000000000000000000000000001",
            value: 0n,
        };

        if (isOffchain) {
            console.log("signing offchain attestation");

            const version = OffchainAttestationVersion.Version2;

            const { schemaId, recipient, revocable, refUID, data } = fixture;


            const request = {
                schema: schemaId, recipient, revocable, expirationTime: NO_EXPIRATION, refUID, data,
            };
            const salt = stringToHex("SALT",
                { size: 32 }) as Hex;


            const attestation = await signOffchainAttestation(
                {
                    ...request,
                    time: fixture.time,
                    version,
                    salt,
                },
                {
                    chain,
                    account,
                },
            );



            console.log('offchain created', attestation);
            const { uid } = attestation;
            return {
                uids: [uid]
            };

        }


        const request = {
            schema: fixture.schemaId,
            data: fixture
        };


        const { uids, txnReceipt } = await makeAttestation(client, request);

        console.log('uids', uids, txnReceipt);
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
}: any) => {
    const { signAttestation } = useAttestationWagmi(account, isOffchain);

    const recipient = "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165" as Address;

    const chainId = useChainId();

    return (
        <AttestationForm
            chainId={sepolia.id}
            schemaId={schemaId}
            schemaIndex={schemaIndex}
            isOffchain={isOffchain}
            signAttestation={async () => signAttestation({ recipient })}
        />
    );
};

const meta = {
    title: "Attestations/AttestationFormWagmi",
    component: AttestationFormWagmi,
    parameters: {
        layout: "centered",
    },
    decorators: [withToaster()],
    args: {},
} satisfies Meta<typeof AttestationFormWagmi>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AttestationWagmiOffchain: Story = {
    args: {
        schemaId: SCHEMA_FIXTURE_IS_A_FRIEND.schemaUID,
        isOffchain: true,
    },
    decorators: [withWalletControlWagmi(), withMockAccount(), withWagmiProvider()],
};

export const AttestationWagmiOnchain: Story = {
    args: {
        schemaId: SCHEMA_FIXTURE_IS_A_FRIEND.schemaUID,
        isOffchain: false,
    },
    decorators: [withMockAccount(), withWagmiProvider()],
};
