import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "#components/shadcn/card";
import { useConfig } from "wagmi";
import { Address } from "viem";
import { NFTCardWithDetails } from "./NFT-Card-with-details";



export const NFTCard = ({
    contractAddress,
    tokenId
}: {
    contractAddress: Address;
    tokenId: number;
}) => {
    const config = useConfig();
    return (
        <NFTCardWithDetails contractAddress={""} tokenId={0} />
    )
}