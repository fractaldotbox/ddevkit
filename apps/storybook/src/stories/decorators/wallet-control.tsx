import { useAccount } from "wagmi";
import { Address } from "../identity/Address";

export const withWalletControl = () => {

    return (Story: any, context: any) => {


        return (
            <div>
                test
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