import { Toaster } from "@/components/ui/toaster"


export const withToaster = () => {
    return (Story: any, context: any) => {

        return (
            <>
                <Story args={context.args} />
                <Toaster />
            </>
        )
    }

}