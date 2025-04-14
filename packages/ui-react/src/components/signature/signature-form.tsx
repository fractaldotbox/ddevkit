"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { type MapStore, map } from "nanostores";
import { useForm } from "react-hook-form";
import type { Hex } from "viem";
import { z } from "zod";

import { Button } from "#components/shadcn/button";
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

const formSchema = z.object({
	message: z.string().min(1).max(50),
});

export const SignatureForm = ({
	$input,
	signMessage,
}: {
	$input: MapStore<{ message: string; signature: Hex }>;
	signMessage: (message: any) => Promise<Hex | void>;
}) => {
	const { message, signature } = useStore($input);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: message || "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		$input.setKey("message", values.message);
		try {
			const signature = await signMessage(values.message);
			if (signature) {
				$input.setKey("signature", signature);
			}
		} catch (error) {
			console.error("Error signing message:", error);
		}
	};

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Message</FormLabel>
								<FormControl>
									<Input
										placeholder="message"
										{...field}
										onChange={(e) => {
											field.onChange(e);
											$input.setKey("message", e.target.value);
										}}
									/>
								</FormControl>
								<FormDescription>
									Please enter your message to sign (For EIP712, this demo add
									that to `message.contents`)
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">
						<Pencil2Icon />
						Sign Message
					</Button>
				</form>
			</Form>
		</div>
	);
};
