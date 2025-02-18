import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Address } from "viem";
import { z } from "zod";
import { Button } from "#components/shadcn/button";
import { Card, CardContent } from "#components/shadcn/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "#components/shadcn/form";
import { Input } from "#components/shadcn/input";
import { ToastAction } from "#components/shadcn/toast";
import { toast } from "#hooks/shadcn/use-toast";
import { getEasscanAttestationUrl } from "#lib/eas/easscan";
import { getShortHex } from "#lib/utils/hex";
import { AttestationSchemaBadge } from "./attestation-schema-badge";

// TODO dynamic enough to generate fields
// now focus on sdk part

export interface AttestationFormParams {
	chainId: number;
	schemaId: string;
	schemaIndex?: string;
	isOffchain: boolean;
	signAttestation: () => Promise<any>;
}

// TODO dynamic schema. For now, hardcode the MetIRL
// https://github.com/fractaldotbox/geist-ddev-kit/issues/56
export const AttestationForm = ({
	chainId,
	schemaId,
	schemaIndex,
	isOffchain,
	signAttestation,
}: AttestationFormParams) => {
	const formSchema = z.object({
		recipient: z
			.string()
			.length(42, {
				message: "address must be 42 characters.",
			})
			.brand<Address>(),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		signAttestation().then(({ uids, txnReceipt }: any) => {
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
									<div className="flex gap-2 pt-4">
										<AttestationSchemaBadge
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
