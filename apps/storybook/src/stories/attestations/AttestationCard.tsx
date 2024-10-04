import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useGetAttestations } from "@/lib/eas/get-attestations"
import { Address, Hex } from "viem"
import { useChainId } from "wagmi"
import { asAttestationMeta, AttestationMeta } from "./attestations"
import { useMemo } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@radix-ui/react-label"
import { Separator } from "@/components/ui/separator"
import { getShortHex } from "@/utils/hex"
import { format } from "date-fns"
import { mainnet } from "viem/chains"
import { SchemaBadge } from "./SchemaBadge"

// TODO indicate network 
const AttestationCardContent = ({ attestation }: { attestation: AttestationMeta }) => {
    const { from, to, schemaId, schemaName, schemaIndex } = attestation;
    if (!attestation) {
        return <Skeleton className="w-[100px] h-[20px] rounded-full" />
    }
    return (
        <CardContent>
            <div className="flex w-full items-center gap-2">
                <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-xs text-muted-foreground">Schema ID</div>
                    <div className="flex items-center gap-1 text-2xl font-bold tabular-nums leading-none">
                        <SchemaBadge chainId={mainnet.id} schemaId={schemaId} schemaIndex={schemaIndex} />
                        <div className="flex flex-col">
                            <div className="text-sm font-normal text-muted-foreground">
                                <span className="text-sm font-normal">
                                    {schemaName}
                                </span>
                            </div>
                            <span className="text-sm font-normal text-muted-foreground">
                                {getShortHex(schemaId as Hex)}
                            </span>
                        </div>
                    </div>
                </div>
                <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-xs text-muted-foreground">From</div>
                    <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                        <span className="text-sm font-normal">
                            {from}
                        </span>
                    </div>
                    <div className="text-xs text-muted-foreground">To</div>
                    <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                        <span className="text-sm font-normal">
                            {to}
                        </span>
                    </div>
                </div>
            </div>

            <Label></Label>
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
                            <div className="flex flex-col">

                                <div className="flex items-baseline ">
                                    <span className="text-xs font-normal">
                                        UID:
                                    </span>
                                </div>

                                <div className="text-xs text-muted-foreground">{attestation.id}</div>

                            </div>

                            <div className="flex flex-col">
                                <span className="text-xs font-normal">
                                    TIMESTAMPS:
                                </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Created: {format(new Date(attestation.time * 1000), 'yyyy/MM/dd HH:MM:ss')}
                            </div>

                        </CardDescription>
                    </CardHeader>
                ) : <Skeleton className="w-[100px] h-[20px] rounded-full" />
            }
            <CardContent>
                {
                    attestation && (
                        <AttestationCardContent attestation={attestation} />
                    )
                }
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )

}