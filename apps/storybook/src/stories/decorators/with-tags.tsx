// No built-in way to show tags at story/sidebar at storybook
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

export const ExperimentalBanner = () => {
	return (
		<Alert className="m-10 bg-slate-400 text-white">
			<TriangleAlert className="h-4 w-4" color="white" />
			<AlertTitle>Experimental</AlertTitle>
			<AlertDescription>
				This component is being actively worked on.
			</AlertDescription>
		</Alert>
	);
};

export const withTags = () => {
	return (Story: any, context: any) => {
		const isExperimental = context.tags?.includes("experimental");

		return (
			<div>
				{isExperimental && <ExperimentalBanner />}
				<Story args={context.args} />
			</div>
		);
	};
};
