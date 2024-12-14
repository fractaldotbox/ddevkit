import { Toaster } from "@/components/ui/toaster";

export const withToaster = () => {
	return (Story: any, context: any) => {
		return (
			<>
				<Story args={context.args} />
				<Toaster className="md:max-w-[560px]" />
			</>
		);
	};
};
