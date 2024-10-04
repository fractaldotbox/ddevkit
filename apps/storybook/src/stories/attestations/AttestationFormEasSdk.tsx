
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { useEthersSigner } from "@/lib/wagmi-utils"
import { Badge } from "@/components/ui/badge"
import { useChainId } from "wagmi"
import { SchemaBadge } from "./SchemaBadge"
import { useAttestation } from "@/lib/eas/use-attestation"
import { Card, CardContent } from "@/components/ui/card"

// TODO dynamic enough to generate fields
// now focus on sdk part

// For now, hardcode the MetIRL
export const AttestationFormEasSdk = ({ schemaId, schemaIndex }: { schemaId: string, schemaIndex: string }) => {

    const { signAttestation } = useAttestation();
    const chainId = useChainId();
    const formSchema = z.object({
        // TODO address
        recipient: z.string().length(42, {
            message: "address must be 42 characters.",
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            recipient: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        signAttestation();
        console.log(values)
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
                                        <SchemaBadge chainId={chainId} schemaId={schemaId} schemaIndex={schemaIndex} />
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

