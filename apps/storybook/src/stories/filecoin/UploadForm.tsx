import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FileLike } from "@web3-storage/w3up-client/types";
import { useAtom } from "jotai";
import { DownloadProgress } from "ky";
import React from "react";

const FormSchema = z.object({
	file: z.string().or(z.custom<File>()).optional(),
});

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper porttitor massa, non placerat dolor rutrum vel. Morbi eu elit vitae odio hendrerit mollis. Proin at nibh auctor, laoreet ante vel, commodo leo. Sed viverra neque id lectus dictum, non accumsan tortor rhoncus. Fusce consectetur est vitae viverra pellentesque. Nunc pharetra felis libero, at rhoncus est euismod et. Morbi ac ultrices lectus, quis commodo eros. Etiam vestibulum finibus imperdiet. Nulla dictum tempor neque ac varius.
Duis sed malesuada odio. Aenean fermentum tristique nunc a dictum. Donec posuere varius pharetra. Sed vitae nisi leo. Nam eget velit id erat sagittis molestie. Fusce feugiat turpis nec neque sodales, sit amet lobortis velit tempus. Curabitur nisi quam, consectetur in velit ac, gravida convallis ante. Etiam condimentum, ligula ut pharetra vehicula, odio ligula laoreet sem, et convallis metus mauris ut tellus. Fusce libero risus, vulputate a suscipit commodo, tincidunt vel ex. Duis quis ultrices ex, in feugiat dolor. Nullam ultrices lorem augue, ac pellentesque velit finibus vel.

Pellentesque rutrum luctus dapibus. Etiam mollis congue quam vel interdum. Sed eu bibendum nunc. Etiam non laoreet est, a tempus est. Integer id neque sit amet elit porta feugiat eu imperdiet justo. Aliquam mi elit, bibendum at ex ut, sollicitudin vulputate risus. Nunc sed massa in nibh lacinia elementum. Suspendisse sodales sollicitudin vulputate. Vestibulum ac nisi eu lectus sodales ullamcorper sit amet id tortor. Etiam lorem nulla, ornare et magna vel, iaculis suscipit risus. Nullam facilisis eros nec turpis varius, non tristique eros sollicitudin. Morbi congue dui eu quam pellentesque, vel bibendum tortor ornare. Ut sed sapien quis ipsum congue tempus. Aliquam erat volutpat. Suspendisse congue congue urna. Integer gravida massa vitae ex volutpat, in sollicitudin diam ultricies.

Nulla at ornare purus, at laoreet nibh. Fusce molestie ex sit amet tristique tempor. Donec pulvinar erat vitae tellus auctor faucibus. Proin eleifend nunc sit amet dui commodo imperdiet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fringilla vehicula quam, condimentum blandit lorem sollicitudin sed. Phasellus et ultrices nibh. In consectetur diam justo, non ultricies nisl mollis dictum. Aenean sit amet nibh hendrerit nulla rhoncus rutrum viverra quis ipsum. Maecenas neque augue, pulvinar mollis facilisis ac, hendrerit vitae nunc.

Sed in faucibus ipsum. In in arcu ornare, maximus eros ac, volutpat turpis. Maecenas dolor sem, eleifend sed ornare quis, placerat eu risus. Phasellus nisl justo, imperdiet sed finibus at, iaculis vel lectus. Donec quis risus ac augue porta gravida. Ut vestibulum posuere nisi in consectetur. Sed sed libero sit amet est commodo interdum nec congue arcu. Aliquam gravida leo libero, vel euismod leo viverra quis. Donec maximus, ligula a bibendum molestie, eros risus lacinia felis, a sagittis nisi lectus a mauris. Phasellus ac libero eget mauris sodales tristique. Pellentesque tristique, tellus id rhoncus blandit, elit metus sagittis eros, quis condimentum neque dolor ac lorem. Nullam sed eros lorem. Suspendisse dapibus nisi sit amet mauris congue, sit amet pulvinar orci venenatis.
`;

export type FileParams<T> = {
	file: T;
	uploadProgressCallback?: (data: DownloadProgress) => void;
};

export type UploadFormParams =
	| {
			isText: false;
			isShowProgress?: boolean;
			uploadFile: (params: FileParams<FileLike>) => Promise<any>;
	  }
	| {
			isText: false;
			isShowProgress?: boolean;
			uploadFile: (params: FileParams<File>) => Promise<any>;
	  }
	| {
			isText: true;
			isShowProgress?: boolean;
			uploadFile: (params: FileParams<string>) => Promise<any>;
	  };

export function UploadForm({
	isText = false,
	isShowProgress = true,
	uploadFile,
}: UploadFormParams) {
	const [progress, setProgress] = React.useState({
		transferredBytes: 0,
		totalBytes: 0,
		percent: 0,
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			file: isText ? lorem : undefined,
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		if (!data?.file) {
			return;
		}
		setProgress({
			transferredBytes: 0,
			totalBytes: 0,
			percent: 0.001,
		});

		const uploadProgressCallback = (data: DownloadProgress) => {
			setProgress(data);
		};
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});

		uploadFile({ ...data, uploadProgressCallback } as FileParams<File> &
			FileParams<string>);
	}

	return (
		<Form {...form}>
			<div className="h-[500px]">
				<div className="mb-10">
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-[600px] space-y-6"
					>
						<FormField
							control={form.control}
							name="file"
							render={({ field }: { field: any }) => (
								<FormItem>
									<FormLabel>File</FormLabel>
									<FormControl>
										{isText ? (
											<div className="w-full">
												<Textarea id="file" {...field} className="h-[400px]" />
											</div>
										) : (
											<Input
												id="file"
												type="file"
												{...field}
												value={field?.value?.fileName}
												onChange={(event) => {
													field.onChange(event?.target?.files?.[0]);
												}}
											/>
										)}
									</FormControl>
									<FormDescription>Upload file to Filecoin</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</div>
				<div>
					{isShowProgress && progress.percent > 0 && (
						<div>
							<span>
								{progress.percent === 1 ? "✅ Uploaded" : "Uploading..."}
							</span>
							<Progress value={progress.percent * 100} />
						</div>
					)}
				</div>
			</div>
		</Form>
	);
}
