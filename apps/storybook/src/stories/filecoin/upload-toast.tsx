import { toast } from "@/hooks/use-toast";
import { IpfsGateway, getGatewayUrlWithCid } from "@/lib/filecoin/gateway";

export const uploadSuccessToast = ({
	cid,
	name = "",
	gateway = IpfsGateway.IpfsIo,
}: { cid: string; name?: string; gateway?: IpfsGateway }) => {
	const url = getGatewayUrlWithCid(cid, gateway);

	toast({
		title: "File uploaded",
		description: (
			<div>
				{name && <span className="pr-2">Name:</span>}
				{name}
				<br />
				<span className="pr-2">CID:</span>
				<a href={url} target="_blank">
					{cid}
				</a>
			</div>
		),
	});
};
