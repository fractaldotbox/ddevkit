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
import { Address, Hex, Transaction } from "viem"
import { useChainId } from "wagmi"
import { useMemo } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@radix-ui/react-label"
import { Separator } from "@/components/ui/separator"
import { getShortHex } from "@/utils/hex"
import { format } from "date-fns"
import { mainnet } from "viem/chains"
import { useGetTransaction } from "@/hooks/use-blockscout"
import { AddrsesBadge } from "../identity/Address"


export const TransactionSummary = ({ transaction }: { transaction: TransactionMeta }) => {

    return (
        <div>
            Transaction Summary
            {/* {transaction} */}
        </div>)
}

export const TransactionCardContent = ({ transaction }: { transaction: TransactionMeta }) => {
    if (!transaction) {
        return <Skeleton className="w-[100px] h-[20px] rounded-full" />
    }



    console.log('transaction', transaction)
    const { from, to } = transaction;

    return (
        <CardContent>
            <div className="flex w-full items-center gap-2">
                <div className="grid flex-1 auto-rows-min gap-0.5">
                    <div className="text-xs text-muted-foreground">Schema ID</div>
                    <div className="flex items-center gap-1 text-2xl font-bold tabular-nums leading-none">
                        <div className="flex flex-col">
                            <div className="text-sm font-normal text-muted-foreground">
                                <span className="text-sm font-normal">
                                    schemaName
                                </span>
                            </div>
                            <span className="text-sm font-normal text-muted-foreground">
                                123
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


export const TransactionCardWithHash = ({
    txnHash
}: {
    txnHash: string
}) => {

    const { data: transaction } = useGetTransaction(txnHash);
    // const chainId = useChainId();


    if (!txnHash || !transaction) {
        return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
    }
    console.log('transaction', transaction);

    // const transaction = useMemo(() => {
    //     if (!data) {
    //         return null;
    //     }
    //     return asAttestationMeta(data?.data?.attestations?.[0]);
    // }, [isSuccess]);
    // 1. onchain vs offchain

    // 2. grid

    // 0x31634ddc4975cc9f2c3c6426034fe0ed30163000cd067e80857136ab86dc0a3b

    return <TransactionCard transaction={transaction} />
}

// some key fields from https://easscan.org/offchain/attestation/view/0x49dff46654fe740241026c1a717ace9ec439abe26124cd925b0ba1df296433c5
export const TransactionCard = ({
    transaction
}: {
    transaction: Transaction
}) => {


    return (

        <Card>
            {
                <CardHeader>
                    <CardTitle>Transaction</CardTitle>
                    <CardDescription>
                        <div className="flex flex-col">

                            <div className="text-xs text-muted-foreground">txnHash</div>

                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs font-normal">
                                Transfer 100 ETH
                            </span>

                            <div>
                                From:
                                <AddrsesBadge address={transaction?.from} />
                            </div>
                            <div>
                                To:
                                <AddrsesBadge address={transaction?.to!} />
                            </div>
                            <span>
                                {/* hash: {txnHash} */}
                            </span>
                            {/* {
                                transaction && <TransactionSummary transaction={transaction} />
                            } */}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {/* Created: {format(new Date(attestation.time * 1000), 'yyyy/MM/dd HH:MM:ss')} */}
                        </div>

                    </CardDescription>
                </CardHeader>
            }
            <CardContent>
                {/* {
                    attestation && (
                        <TransactionCardContent attestation={attestation} />
                    )
                } */}
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )

}
