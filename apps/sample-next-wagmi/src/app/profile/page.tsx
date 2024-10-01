'use client';
// https://wagmi.sh/react/guides/connect-wallet#connect-wallet
import Image from "next/image";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { Account } from "../account";
import { WalletOptions } from "../wallet-options";


function ConnectWallet() {
    const { isConnected } = useAccount()
    if (isConnected) return <Account />
    return <WalletOptions />
}


export default function Page() {


    return (
        <div>
            <ConnectWallet />
        </div>
    );
}
