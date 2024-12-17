import { ScrollArea } from "#components/shadcn/scroll-area";
import { cn } from "#lib/shadcn/utils";

export const ScrollableCodeBlock = ({
	title,
	codeObject,
	className,
}: {
	title: string;
	codeObject: any;
	className?: string;
}) => {
	return (
		<ScrollArea className={cn(" rounded-md border m-2", className)}>
			<div className="p-4">
				<h4 className="mb-4 text-sm font-medium leading-none"> {title}</h4>

				<pre className="text-xs"> {JSON.stringify(codeObject, null, 2)}</pre>
			</div>
		</ScrollArea>
	);
};
