import { toast } from "@/hooks/use-toast";
import { getGatewayUrlWithCid } from "@/lib/filecoin/gateway";

export const createToast = ({ cid, name }: { cid: string; name: string }) => {
	const url = getGatewayUrlWithCid(cid);

	toast({
		title: "File uploaded",
		description: (
			<div>
				File uploaded with {name} <br />
				CID:<a href={url}>{cid}</a>
			</div>
		),
	});
};
