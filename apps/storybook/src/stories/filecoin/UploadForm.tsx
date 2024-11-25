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
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
    file: z.any(),
})

// TODO generics
export type FileParams = { file?: any }

export function UploadForm({
    isText = false,
    uploadFile
}: {
    isText?: boolean,
    uploadFile: (params: FileParams) => Promise<any>
}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            file: null,
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log('submit', data);
        uploadFile(data)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    // TODO add toggle and upload text

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>File</FormLabel>
                            <FormControl>
                                {
                                    isText ? <Input id="file" type="text" {...field} /> :
                                        (
                                            <Input id="file" type="file" {...field} />
                                        )
                                }
                            </FormControl>
                            <FormDescription>
                                Upload file to Filecoin
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
