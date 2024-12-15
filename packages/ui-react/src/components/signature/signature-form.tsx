"use client";

import { atom, useAtom } from "jotai";
import type { Hex } from "viem";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "#components/ui/form.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil2Icon } from "@radix-ui/react-icons";

import { Button } from "#components/ui/button.tsx";
import { Input } from "#components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	message: z.string().min(1).max(50),
});

// wrapper for storbook demo
export const SignatureForm = ({
	messageAtom,
	signatureAtom,
	signMessage,
}: {
	messageAtom: ReturnType<typeof atom<string>>;
	signatureAtom: ReturnType<typeof atom<Hex>>;
	signMessage: (message: any) => Promise<Hex | void>;
}) => {
	const [, setMessage] = useAtom(messageAtom);

	const [, setSignature] = useAtom(signatureAtom);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setMessage(values.message);
		try {
			const signature = await signMessage(values.message);
			if (signature) {
				setSignature(signature);
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
											setMessage(e.target.value);
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
