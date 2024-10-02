import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { withWagmiProvider } from '../decorators/wagmi';
import * as secp from '@noble/secp256k1';

// wrapper for storbook demo
const SignatureFormDemo = ({ isRaw = false, privateKey }: { isRaw: boolean, privateKey?: string }) => {
    // const [message, setMessage] = useState('');
    // const [signature, setSignature] = useState('');


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (isRaw) {

        }

        // try {
        //     const signature = await signMessage(message);
        //     setSignature(secp.utils.bytesToHex(signature));
        // } catch (error) {
        //     console.error('Error signing message:', error);
        // }
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>

                a
                {/* <div>
                    <Text as="label" htmlFor="message">Message:</Text>
                    <Input
                        id="message"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit">Sign Message</Button> */}
            </form>
            {/* {signature && (
                <div>
                    <Text>Signature:</Text>
                    <Text>{signature}</Text>
                </div>
            )} */}
        </div>
    );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Signature/SignatureFormDemo',
    component: SignatureFormDemo,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof SignatureFormDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Wagmi: Story = {
    args: {
        isRaw: false
    },
    decorators: [
        withWagmiProvider()
    ]
};


export const Raw: Story = {
    args: {
        isRaw: true,
        privateKey: secp.utils.randomPrivateKey(); // Secure random private key
    },
};




