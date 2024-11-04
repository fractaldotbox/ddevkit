import { Toaster } from "@/components/ui/toaster";
import { useAccount } from "wagmi";

export const withToaster = () => {
	return (Story: any, context: any) => {
		return (
			<>
				<Story args={context.args} />
				<Toaster />
			</>
		);
	};
};
