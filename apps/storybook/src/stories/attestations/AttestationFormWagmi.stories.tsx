import type { Meta, StoryObj } from "@storybook/react";
import { AttestationForm } from "./AttestationForm";
import { withMockAccount, withWagmiProvider } from "../decorators/wagmi";
import {
    SCHEMA_FIXTURE_IS_A_FRIEND,
    ZERO_BYTES32,
} from "@/lib/eas/eas-test.fixture";
import { NO_EXPIRATION } from "@/lib/eas/request";
import { Account, Address, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { makeAttestation } from "@/lib/eas/viem/onchain";
import { withToaster } from "../decorators/toaster";
import { useChainId } from "wagmi";
import { withWalletControlWagmi } from "../decorators/wallet-control";

const useAttestationWagmi = (account: Account, isOffchain: boolean) => {
    const client = createWalletClient({
        chain: sepolia,
        transport: http(),
        account,
    });

    const signAttestation = async ({
        recipient,
    }: {
        recipient: Address;
    }) => {
        if (isOffchain) {
            console.log("signing offchain attestation");
            return;
        }

        console.log("signing onchain attestation");
        const fixture = {
            schemaId: SCHEMA_FIXTURE_IS_A_FRIEND.schemaUID,
            refUID: ZERO_BYTES32,
            time: 1728637333n,
            expirationTime: NO_EXPIRATION,
            revocationTime: 0n,
            recipient,
            attester: account.address,
            revocable: true,
            // "yes"
            data: "0x0000000000000000000000000000000000000000000000000000000000000001",
            value: 0n,
        };

        const { schemaId, expirationTime, revocable, refUID, data, value } =
            fixture;

        const request = {
            schema: schemaId,
            data: { recipient, expirationTime, revocable, refUID, data, value },
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
            chainId={chainId}
            schemaId={schemaId}
            schemaIndex={schemaIndex}
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
