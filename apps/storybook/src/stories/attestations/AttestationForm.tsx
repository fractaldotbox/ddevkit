
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/hooks/use-toast"

import { ToastAction } from "@/components/ui/toast"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SchemaBadge } from "./SchemaBadge"
import { useAttestation } from "@/lib/eas/use-attestation"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

// TODO dynamic enough to generate fields
// now focus on sdk part

// For now, hardcode the MetIRL
export const AttestationForm = ({ chainId, schemaId, schemaIndex, signAttestation }:
    {
        chainId: number,
        schemaId: string,
        schemaIndex?: string,
        signAttestation: () => Promise<any>
    }) => {


    const formSchema = z.object({
        // TODO address
        recipient: z.string().length(42, {
            message: "address must be 42 characters.",
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        signAttestation()
            .then(({ uids, txnReceipt }: any) => {
                console.log('success', uids, txnReceipt)
                toast({
                    title: "Attestation success",
                    description: `onchain txn ${txnReceipt?.transactionHash}`,
                    action: (
                        <ToastAction altText="Goto schedule to undo">{uids?.[0]}</ToastAction>
                    ),
                })
            });
    }

    return (
        <Card className="pt-8">
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="recipient"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex gap-2">
                                        <SchemaBadge chainId={chainId} schemaId={schemaId} schemaIndex={schemaIndex || ''} />
                                        MET IRL
                                    </div>
                                    <FormLabel>Recipient</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Attest You met this person in real life
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

    )
}

