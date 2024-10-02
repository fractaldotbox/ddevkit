import { useGetAttestations } from "@/lib/eas/get-attestations";
import { Address } from "viem";
import { useChainId } from "wagmi";



export const Attestations = ({ address }: {
    address: Address
}) => {

    const chainId = useChainId();
    const { data, isLoading } = useGetAttestations({
        chainId,
        address
    });

    return (
        <div>
            {chainId}
            {isLoading ? 'loading...' : ''}
            {JSON.stringify(data)}
        </div>
    )
}