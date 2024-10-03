import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AttestationQueryResult, useGetAttestations } from "@/lib/eas/get-attestations"
import { Address } from "viem"
import { useChainId } from "wagmi"
import { asAttestationMeta, AttestationMeta } from "./attestations"
import { useMemo } from "react"
import { Skeleton } from "@/components/ui/skeleton"


const AttestationCardContent = ({ attestation }: { attestation: AttestationMeta }) => {
    const { from, to, schemaId } = attestation;
    if (!attestation) {
        return <Skeleton className="w-[100px] h-[20px] rounded-full" />
    }
    return (
        <CardContent>
            Schema
            <Badge>#{schemaId}</Badge>
            <p>From</p>
            {from}
            <p>To</p>
            {to}
            <p>Card Content</p>
        </CardContent>
    )
}

// some key fields from https://easscan.org/offchain/attestation/view/0x49dff46654fe740241026c1a717ace9ec439abe26124cd925b0ba1df296433c5
export const AttestationCard = ({
    attesterAddress
}: {
    attesterAddress: Address
}) => {

    const chainId = useChainId();
    const { data, isSuccess } = useGetAttestations({
        chainId,
        address: attesterAddress
    });

    const attestation = useMemo(() => {
        if (!data) {
            return null;
        }
        return asAttestationMeta(data?.data?.attestations?.[0]);
    }, [isSuccess]);
    // 1. onchain vs offchain

    // 2. grid

    return (

        <Card>
            {
                attestation ? (
                    <CardHeader>
                        <CardTitle>Attestation</CardTitle>
                        <CardDescription>
                            <div className="flex">
                                UID:
                                {attestation.id}
                            </div>
                        </CardDescription>
                    </CardHeader>
                ) : <Skeleton className="w-[100px] h-[20px] rounded-full" />
            }
            <CardContent>
                <AttestationCardContent attestation={attestation} />
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )

}