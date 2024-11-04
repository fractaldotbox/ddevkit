import { Button } from "@/components/ui/button";
import { getEasscanAttestationUrl } from "@/lib/eas/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { useAttestation } from "@/lib/eas/use-attestation";
import { getShortHex } from "@/utils/hex";
import { SchemaBadge } from "./SchemaBadge";

// TODO dynamic enough to generate fields
// now focus on sdk part

export interface AttestationFormParams {
	chainId: number;
	schemaId: string;
	schemaIndex?: string;
	isOffchain: boolean;
	signAttestation: () => Promise<any>;
}

// For now, hardcode the MetIRL
export const AttestationForm = ({
	chainId,
	schemaId,
	schemaIndex,
	isOffchain,
	signAttestation,
}: AttestationFormParams) => {
	const formSchema = z.object({
		// TODO address
		recipient: z.string().length(42, {
			message: "address must be 42 characters.",
		}),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		signAttestation().then(({ uids, txnReceipt }: any) => {
			console.log("success", uids, txnReceipt, isOffchain);
			const [uid] = uids;
			const url = getEasscanAttestationUrl(chainId, uid, isOffchain);

			const description = isOffchain
				? getShortHex(uid)
				: `attested ${txnReceipt?.transactionHash}`;

			toast({
				title: "Attestation success",
				description,
				action: (
					<ToastAction altText="View on EASSCAN">
						<a target="_blank" href={url}>
							View on EASSCAN
						</a>
					</ToastAction>
				),
			});
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
										<SchemaBadge
											chainId={chainId}
											schemaId={schemaId}
											schemaIndex={schemaIndex || ""}
										/>
										IS A FRIEND
									</div>
									<FormLabel>Recipient</FormLabel>
									<FormControl>
										<Input
											placeholder="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
											{...field}
										/>
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
	);
};
