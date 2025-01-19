import { Spinner } from "@radix-ui/themes";
import { ZodNumber, z } from "zod";
import { Badge } from "#components/shadcn/badge";
import { Button } from "#components/shadcn/button";
import { Card, CardContent } from "#components/shadcn/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "#components/shadcn/form";
import { Input } from "#components/shadcn/input";
import { ToastAction } from "#components/shadcn/toast";
import {
	getSubmissionData,
	useEasSchemaForm,
} from "#hooks/eas/use-eas-schema-form";
import { toast } from "#hooks/shadcn/use-toast";
import { getEasscanAttestationUrl } from "#lib/eas/easscan";
import { getShortHex } from "#lib/utils/hex";
import { AttestationSchemaBadge } from "./attestation-schema-badge";

export interface AttestationFormParams {
	chainId: number;
	schemaId: string;
	schemaIndex?: string;
	isOffchain: boolean;
	signAttestation: (values: any) => Promise<any>;
}

export const AttestationForm = ({
	chainId,
	schemaId,
	schemaIndex,
	isOffchain,
	signAttestation,
}: AttestationFormParams) => {
	const { formSchema, form, isLoading, schemaDetails } = useEasSchemaForm({
		schemaId,
		chainId,
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (!!schemaDetails)
			signAttestation(
				getSubmissionData(schemaDetails.schemaString, values),
			).then(({ uids, txnReceipt }: any) => {
				console.log({ uids, txnReceipt });
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

	// TODO: array schema handling
	return (
		<Card className="pt-8">
			<CardContent>
				{isLoading ? (
					<Spinner className="animate-spin" />
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-5"
						>
							<div className="flex justify-between items-center pt-4">
								<div className="flex gap-2 items-center">
									<AttestationSchemaBadge
										chainId={chainId}
										schemaId={schemaId}
										schemaIndex={schemaDetails?.index || schemaIndex || ""}
									/>
									{getShortHex(schemaId as unknown as `0x${string}`)}
								</div>

								<div className="flex gap-2 items-center">
									{!!schemaDetails?.revocable && (
										<Badge variant={"destructive"}>REVOCABLE</Badge>
									)}
									{!!isOffchain && <Badge>OFFCHAIN</Badge>}
								</div>
							</div>
							{Object.keys(formSchema.shape).map((schemaKey) => {
								return (
									<FormField
										key={schemaKey}
										control={form.control}
										name={schemaKey}
										render={({ field }) => (
											<FormItem>
												<FormLabel>{schemaKey}</FormLabel>
												<FormControl>
													<Input
														{...field}
														type={
															formSchema.shape[schemaKey] instanceof ZodNumber
																? "number"
																: "text"
														}
														value={field.value ?? ""}
														onChange={(e) => {
															const value =
																formSchema.shape[schemaKey] instanceof ZodNumber
																	? e.target.valueAsNumber || 0
																	: e.target.value;
															field.onChange(value);
														}}
														placeholder={
															formSchema.shape[schemaKey] instanceof ZodNumber
																? "number"
																: "string"
														}
													/>
												</FormControl>
												<FormMessage className="font-light" />
											</FormItem>
										)}
									/>
								);
							})}

							<Button type="submit" style={{ marginTop: "0.5rem" }}>
								Submit
							</Button>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	);
};
