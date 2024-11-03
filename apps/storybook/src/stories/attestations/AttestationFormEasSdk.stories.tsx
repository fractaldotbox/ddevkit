import type { Meta, StoryObj } from '@storybook/react';
import { AttestationForm } from './AttestationForm';
import { BY_USER } from '../fixture';
import { createEthersSigner } from '@/lib/eas/ethers';
import { EAS_CONTRACT_ADDRESS } from '@/lib/eas/abi';
import { createAttestationOnchain, createEAS } from '@/lib/eas/ethers/onchain';
import { withToaster } from '../decorators/toaster';
import { SCHEMA_FIXTURE_IS_A_FRIEND, VOTE_SCHEMA_FIXTURE, ZERO_BYTES, ZERO_BYTES32 } from '@/lib/eas/eas-test.fixture';
import { withWalletControl } from '../decorators/wallet-control';
import { Address, Hex } from 'viem';
import { NO_EXPIRATION } from '@/lib/eas/request';
import { encodeBytes32String } from 'ethers';



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
    isOffchain
}: any) => {

    const signer = createEthersSigner(privateKey, 11155111);

    const eas = createEAS(EAS_CONTRACT_ADDRESS, signer);

    console.log('sdk', isOffchain)
    return <AttestationForm
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
                console.log('create offchain attestation');

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

                console.log('created', attestation)
                const { uid } = attestation;
                return {
                    uids: [uid]
                };
            }
            return createAttestationOnchain({
                eas,
                schemaString: VOTE_SCHEMA_FIXTURE.schemaString,
                encodedDataParams: VOTE_SCHEMA_FIXTURE.encodedData,
                schemaUID: schemaId,
                attestationData: {}
            })
        }} />


}

const meta = {
    title: 'Attestations/AttestationFormEasSdk',
    component: AttestationFormEasSdk,
    parameters: {
        layout: 'centered',
    },
    decorators: [withToaster(), withWalletControl()],
    args: {}
} satisfies Meta<typeof AttestationFormEasSdk>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Onchain: Story = {
    args: {
        privateKey: BY_USER.mock.privateKey,
        schemaId: VOTE_SCHEMA_FIXTURE.schemaUID,
        schemaIndex: '1',
        isOffchain: false
    },
    decorators: [
    ]
};

export const Offchain: Story = {
    args: {
        privateKey: BY_USER.mock.privateKey,
        schemaId: VOTE_SCHEMA_FIXTURE.schemaUID,
        schemaIndex: '1',
        isOffchain: true
    },
    decorators: [
    ]
};

