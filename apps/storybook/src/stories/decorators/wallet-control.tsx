import { useAccount } from "wagmi";
import { Address } from "../identity/Address";
import { privateKeyToAccount } from "viem/accounts";

export const withWalletControl = () => {

    return (Story: any, context: any) => {

        const { privateKey } = context?.args;
        const account = privateKeyToAccount(privateKey);
        const { address } = account;


        return (
            <div>
                <Address address={address} />
                <div className="p-10">
                    <Story args={context.args} />

                </div>
            </div>
        )

    }
}


export const withWalletControlWagmi = () => {



    return (Story: any, context: any) => {

        const { account } = context?.args;

        const { address } = account;

        return (
            <div className="w-full top-0">
                <div className="float-right">
                    {
                        address && (
                            <Address address={address} />
                        )
                    }
                </div>
                <div className="p-10">
                    <Story args={context.args} />

                </div>


            </div>

        )
    }


}