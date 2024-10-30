import type { Meta, StoryObj } from '@storybook/react';
import { AttestationForm } from './AttestationForm';
import { BY_USER } from '../fixture';
import { createEthersSigner } from '@/lib/eas/ethers';
import { EAS_CONTRACT_ADDRESS } from '@/lib/eas/abi';
import { createAttestation, createEAS } from '@/lib/eas/ethers/onchain';
import { withToaster } from '../decorators/toaster';
import { SCHEMA_FIXTURE_IS_A_FRIEND } from '@/lib/eas/eas-test.fixture';
import { withWalletControl } from '../decorators/wallet-control';


const AttestationFormEasSdk = ({
    privateKey,
    schemaId,
    schemaIndex
}: any) => {

    const signer = createEthersSigner(privateKey, 11155111);

    const eas = createEAS(EAS_CONTRACT_ADDRESS, signer);





    return <AttestationForm
        chainId={11155111}
        schemaId={schemaId}
        schemaIndex={schemaIndex}
        signAttestation={(): Promise<any> => {
            return createAttestation({
                eas,
                schemaString: '',
                encodedDataParams: '',
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


export const EthersEasSdk: Story = {
    args: {
        privateKey: BY_USER.mock.privateKey,
        schemaId: SCHEMA_FIXTURE_IS_A_FRIEND.schemaUID,
        schemaIndex: '1'
    },
    decorators: [
    ]
};

