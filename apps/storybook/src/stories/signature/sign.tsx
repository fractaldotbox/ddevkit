// ECDSA signatures over secp256k1
import * as secp from '@noble/secp256k1';
import { useEffect, useRef, useState } from 'react';
import { recoverMessageAddress } from 'viem';
import { useAccount, useConfig, useSignMessage } from 'wagmi';
import { signMessage } from '@wagmi/core'

// https://www.npmjs.com/package/@noble/secp256k1
const signMessageRaw = async (privateKey: string, message: string) => {

    // sha256 of 'hello world'
    const msgHash = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
    // const pubKey = secp.getPublicKey(privKey);
    // const signature = await secp.signAsync(msgHash, privKey); // Sync methods below
    // const isValid = secp.verify(signature, msgHash, pubKey);
    const signature = '';
    return signature;
};

// conditional hooks TODO
export const useSign = (isRaw: boolean) => {
    if (isRaw) {
        return signMessageRaw;
    }

    return signMessage;
}

export const useSignWagmi = () => {

}



// export const SignMessageWagmi = () => {
//     const config = useConfig();
//     const account = useAccount();

//     const onClick = async () => {

//         const result = await signMessage(config, {
//             account,
//             message: 'hello world',
//         })
//     }





// }



// export const SignForm = () => {
//     const [message, setMessage] = useState('');
//     const [signature, setSignature] = useState('');


//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         try {
//             const signature = await signMessage(message);
//             setSignature(secp.utils.bytesToHex(signature));
//         } catch (error) {
//             console.error('Error signing message:', error);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <Text as="label" htmlFor="message">Message:</Text>
//                     <Input
//                         id="message"
//                         type="text"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <Button type="submit">Sign Message</Button>
//             </form>
//             {signature && (
//                 <div>
//                     <Text>Signature:</Text>
//                     <Text>{signature}</Text>
//                 </div>
//             )}
//         </div>
//     );
// };