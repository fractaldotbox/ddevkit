import type { Meta, StoryObj } from '@storybook/react';
import { AttestationForm } from './AttestationForm';
import { withWagmiProvider } from '../decorators/wagmi';
import { useAttestation } from '@/lib/eas/use-attestation';
import { BY_USER } from '../fixture';
import { createEthersSigner } from '@/lib/eas/ethers';
import { EAS_CONTRACT_ADDRESS } from '@/lib/eas/abi';
import { createAttestation, createEAS } from '@/lib/eas/ethers/onchain';
import { JsonRpcSigner } from 'ethers';


const AttestationFormEasSdk = ({
    privateKey,
    schemaId,
    schemaIndex
}: any) => {



    const signer = createEthersSigner(privateKey, 11155111);

    const eas = createEAS(EAS_CONTRACT_ADDRESS, signer);


    createAttestation({
        eas,
        schemaString: '',
        encodedDataParams: '',
        schemaUID: '',
        attestationData: ''
    })



    return <AttestationForm

        schemaId={schemaId}
        schemaIndex={schemaIndex}
    />


}

const meta = {
    title: 'Attestations/AttestationFormEasSdk',
    component: AttestationFormEasSdk,
    parameters: {
        layout: 'centered',
    },
    args: {}
} satisfies Meta<typeof AttestationFormEasSdk>;

export default meta;
type Story = StoryObj<typeof meta>;


// export const EasSdk: Story = {
//     args: {
//         schemaId: '',
//         schemaIndex: '1'
//     },
// };


// export const withAttestation = () => {

//     const createAttestation = () => {



//     }

//     return (Story: any, context: any) => (
//         <div>

//             <Story args={{ ...context.args || {} }} />

//         </div>
//     )
// }




export const EthersEasSdk: Story = {
    args: {
        privateKey: BY_USER.mock.privateKey,
        schemaId: '',
        schemaIndex: '1'
    },
    decorators: [
    ]
};

